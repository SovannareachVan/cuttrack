import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DEFAULT_CARDIO } from '../data/cardio';
import { DEFAULT_PROGRAM_ID } from '../data/programs';

/**
 * APP STORE — the single source of truth for the whole app
 * -------------------------------------------------------
 * Everything lives in ONE place so profiles, programs and daily records never
 * drift out of sync. Components read from here instead of touching
 * LocalStorage directly.
 *
 * STORAGE KEY: `cuttrack-v2`
 *
 * SHAPE
 * -----
 * {
 *   version: 2,
 *   activeProfileId: "p_ab12cd34",
 *   profiles: {
 *     p_ab12cd34: {
 *       id, name, mode, programId, customDays, createdAt,
 *       plans:   { "2026-10-19": "shoulder_day" },   // which workout that day
 *       days:    { "2026-10-19": { workoutId, exercises, cardio, completed, updatedAt } },
 *       weights: { "2026-10-19": 78.4 }
 *     }
 *   }
 * }
 *
 * PLANNING MODES
 *   'daily'   choose the workout when the day starts (the default)
 *   'program' follow a fixed weekly split chosen at setup
 *
 * `plans` holds the daily choice, kept separate from `days` so that resetting
 * a logged workout does not erase what you planned to do.
 *
 * Each person (you, your brother) is a separate profile with its own program
 * and its own history. Switching profile switches everything.
 *
 * MIGRATION: v1 stored a single person's days directly at the top level.
 * If `cuttrack-v1` is present it is moved into a default profile so no
 * history is lost.
 *
 * IMPORTANT: LocalStorage belongs to ONE browser on ONE device. Your phone
 * and your computer keep separate copies.
 */

const STORAGE_KEY = 'cuttrack-v2';
const LEGACY_KEY = 'cuttrack-v1';
const SCHEMA_VERSION = 2;

const AppStoreContext = createContext(null);

function emptyStore() {
  return { version: SCHEMA_VERSION, activeProfileId: null, profiles: {} };
}

export function makeProfileId() {
  return `p_${Math.random().toString(36).slice(2, 10)}`;
}

/** A blank day record for a workout. */
export function createEmptyRecord(workout, exercises) {
  const exercisesOut = {};

  for (const exercise of exercises) {
    exercisesOut[exercise.id] = {
      sets: Array.from({ length: exercise.sets }, () => ({
        weight: '',
        reps: '',
        done: false,
      })),
    };
  }

  return {
    workoutId: workout.id,
    exercises: exercisesOut,
    cardio: { ...DEFAULT_CARDIO, done: false },
    completed: false,
    updatedAt: new Date().toISOString(),
  };
}

/** Merges a stored record over current defaults so new fields always exist. */
function mergeRecord(blank, existing) {
  if (!existing) return blank;
  return {
    ...blank,
    ...existing,
    exercises: { ...blank.exercises, ...(existing.exercises ?? {}) },
    cardio: { ...blank.cardio, ...(existing.cardio ?? {}) },
    completed: Boolean(existing.completed),
  };
}

/**
 * Reads storage and migrates older versions. Any malformed value falls back to
 * an empty store instead of throwing, so bad data can never white-screen the
 * app.
 */
function loadStore() {
  if (typeof window === 'undefined') return emptyStore();

  let base = emptyStore();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (
        parsed &&
        typeof parsed === 'object' &&
        parsed.version === SCHEMA_VERSION &&
        parsed.profiles &&
        typeof parsed.profiles === 'object'
      ) {
        base = {
          version: SCHEMA_VERSION,
          activeProfileId: parsed.activeProfileId ?? null,
          profiles: parsed.profiles,
        };
      }
    }
  } catch {
    base = emptyStore();
  }

  // ---- v1 -> v2 migration ----
  try {
    const legacy = window.localStorage.getItem(LEGACY_KEY);
    if (legacy && Object.keys(base.profiles).length === 0) {
      const parsed = JSON.parse(legacy);
      if (parsed && typeof parsed === 'object' && parsed.days) {
        const id = makeProfileId();
        base.profiles[id] = {
          id,
          name: 'Me',
          programId: DEFAULT_PROGRAM_ID,
          createdAt: new Date().toISOString(),
          days: parsed.days ?? {},
          weights: parsed.weights ?? {},
        };
        base.activeProfileId = id;
      }
    }
  } catch {
    // ignore unreadable legacy data
  }

  return base;
}

export function AppStoreProvider({ children }) {
  const [store, setStore] = useState(loadStore);
  const firstRun = useRef(true);

  // Blank record per (profile, date), captured whenever a day is rendered.
  // Writes merge over this so a never-saved day still has its set rows.
  const defaultsRef = useRef({});

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch {
      // Storage blocked or full — the session keeps working in memory.
    }
  }, [store]);

  /* ---------------- Profiles ---------------- */

  const createProfile = useCallback((name, programId, mode = 'daily') => {
    const id = makeProfileId();
    setStore((prev) => ({
      ...prev,
      activeProfileId: id,
      profiles: {
        ...prev.profiles,
        [id]: {
          id,
          name: name.trim() || 'Athlete',
          mode,
          programId,
          createdAt: new Date().toISOString(),
          plans: {},
          days: {},
          weights: {},
        },
      },
    }));
    return id;
  }, []);

  const removeProfile = useCallback((profileId) => {
    setStore((prev) => {
      const profiles = { ...prev.profiles };
      delete profiles[profileId];

      const remaining = Object.keys(profiles);
      return {
        ...prev,
        profiles,
        activeProfileId:
          prev.activeProfileId === profileId
            ? (remaining[0] ?? null)
            : prev.activeProfileId,
      };
    });
  }, []);

  const setActiveProfile = useCallback((profileId) => {
    setStore((prev) => ({ ...prev, activeProfileId: profileId }));
  }, []);

  const setProfileName = useCallback((profileId, name) => {
    setStore((prev) => ({
      ...prev,
      profiles: {
        ...prev.profiles,
        [profileId]: { ...prev.profiles[profileId], name },
      },
    }));
  }, []);

  const setProfileProgram = useCallback((profileId, programId) => {
    setStore((prev) => ({
      ...prev,
      profiles: {
        ...prev.profiles,
        [profileId]: {
          ...prev.profiles[profileId],
          programId,
          // Picking a program clears any hand-edited week, otherwise the old
          // override would silently shadow the new program.
          customDays: null,
        },
      },
    }));
  }, []);

  /**
   * Saves a hand-edited week. `days` maps JS day number -> workout id.
   * Passing `null` returns the profile to its program's default schedule.
   */
  const setProfileDays = useCallback((profileId, days) => {
    setStore((prev) => ({
      ...prev,
      profiles: {
        ...prev.profiles,
        [profileId]: { ...prev.profiles[profileId], customDays: days },
      },
    }));
  }, []);

  /**
   * Chooses which workout a given day will be.
   * Used by 'daily' mode, where you pick at the start of every session.
   */
  const setDayPlan = useCallback((dateKey, workoutId) => {
    setStore((prev) => {
      const profileId = prev.activeProfileId;
      if (!profileId) return prev;

      const profile = prev.profiles[profileId];
      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [profileId]: {
            ...profile,
            plans: { ...profile.plans, [dateKey]: workoutId },
          },
        },
      };
    });
  }, []);

  /** Switches between picking each day and following a weekly program. */
  const setProfileMode = useCallback((profileId, mode) => {
    setStore((prev) => ({
      ...prev,
      profiles: {
        ...prev.profiles,
        [profileId]: { ...prev.profiles[profileId], mode },
      },
    }));
  }, []);

  /* ---------------- Daily records ---------------- */

  /**
   * Applies an updater to one day of the ACTIVE profile.
   * Merges over the blank record captured by getDay, so writes to a day that
   * has never been saved still land.
   */
  const updateDay = useCallback(
    (dateKey, updater) => {
      setStore((prev) => {
        const profileId = prev.activeProfileId;
        if (!profileId) return prev;

        const profile = prev.profiles[profileId];
        const blank = defaultsRef.current[`${profileId}|${dateKey}`] ?? {
          exercises: {},
          cardio: { ...DEFAULT_CARDIO, done: false },
        };
        const current = mergeRecord(blank, profile.days[dateKey]);
        const next = updater(current);

        return {
          ...prev,
          profiles: {
            ...prev.profiles,
            [profileId]: {
              ...profile,
              days: {
                ...profile.days,
                [dateKey]: { ...next, updatedAt: new Date().toISOString() },
              },
            },
          },
        };
      });
    },
    []
  );

  /** Returns the record for a date (blank if none), and caches the defaults. */
  const getDay = useCallback(
    (dateKey, workout, exercises) => {
      if (!dateKey || !store.activeProfileId) return null;

      const profile = store.profiles[store.activeProfileId];
      if (!profile) return null;

      const blank = createEmptyRecord(workout, exercises);
      defaultsRef.current[`${store.activeProfileId}|${dateKey}`] = blank;

      return mergeRecord(blank, profile.days[dateKey]);
    },
    [store]
  );

  /** Saves weight or reps for one set. Typing never marks a set complete. */
  const setSetField = useCallback(
    (dateKey, exerciseId, setIndex, field, value) => {
      updateDay(dateKey, (record) => {
        const sets = [...(record.exercises?.[exerciseId]?.sets ?? [])];
        if (!sets[setIndex]) return record;

        sets[setIndex] = { ...sets[setIndex], [field]: value };
        return {
          ...record,
          exercises: {
            ...record.exercises,
            [exerciseId]: { ...record.exercises[exerciseId], sets },
          },
        };
      });
    },
    [updateDay]
  );

  /** Ticks or unticks a completed set. */
  const toggleSet = useCallback(
    (dateKey, exerciseId, setIndex) => {
      updateDay(dateKey, (record) => {
        const sets = [...(record.exercises?.[exerciseId]?.sets ?? [])];
        if (!sets[setIndex]) return record;

        sets[setIndex] = { ...sets[setIndex], done: !sets[setIndex].done };
        return {
          ...record,
          exercises: {
            ...record.exercises,
            [exerciseId]: { ...record.exercises[exerciseId], sets },
          },
        };
      });
    },
    [updateDay]
  );

  const setCardio = useCallback(
    (dateKey, patch) => {
      updateDay(dateKey, (record) => ({
        ...record,
        cardio: { ...record.cardio, ...patch },
      }));
    },
    [updateDay]
  );

  const setWorkoutComplete = useCallback(
    (dateKey, completed) => {
      updateDay(dateKey, (record) => ({ ...record, completed }));
    },
    [updateDay]
  );

  /** Deletes one day of the active profile, after the user confirms. */
  const resetDay = useCallback(
    (dateKey) => {
      setStore((prev) => {
        const profileId = prev.activeProfileId;
        if (!profileId) return prev;

        const profile = prev.profiles[profileId];
        const days = { ...profile.days };
        delete days[dateKey];

        return {
          ...prev,
          profiles: { ...prev.profiles, [profileId]: { ...profile, days } },
        };
      });
    },
    []
  );

  const setBodyWeight = useCallback((dateKey, weight) => {
    setStore((prev) => {
      const profileId = prev.activeProfileId;
      if (!profileId) return prev;

      const profile = prev.profiles[profileId];
      const weights = { ...profile.weights };

      if (weight === '' || weight === null || weight === undefined) {
        delete weights[dateKey];
      } else {
        weights[dateKey] = Number(weight);
      }

      return {
        ...prev,
        profiles: { ...prev.profiles, [profileId]: { ...profile, weights } },
      };
    });
  }, []);

  /* ---------------- Derived ---------------- */

  const profileList = useMemo(
    () => Object.values(store.profiles).sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [store.profiles]
  );

  const activeProfile = store.activeProfileId
    ? (store.profiles[store.activeProfileId] ?? null)
    : null;

  const value = useMemo(
    () => ({
      profiles: profileList,
      activeProfile,
      activeProfileId: store.activeProfileId,
      createProfile,
      removeProfile,
      setActiveProfile,
      setProfileName,
      setProfileProgram,
      setProfileDays,
      setDayPlan,
      setProfileMode,
      getDay,
      setSetField,
      toggleSet,
      setCardio,
      setWorkoutComplete,
      resetDay,
      setBodyWeight,
    }),
    [
      profileList,
      activeProfile,
      store.activeProfileId,
      createProfile,
      removeProfile,
      setActiveProfile,
      setProfileName,
      setProfileProgram,
      setProfileDays,
      setDayPlan,
      setProfileMode,
      getDay,
      setSetField,
      toggleSet,
      setCardio,
      setWorkoutComplete,
      resetDay,
      setBodyWeight,
    ]
  );

  return (
    <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>
  );
}

/** Any component inside the provider can call this. */
export function useAppStore() {
  const store = useContext(AppStoreContext);
  if (!store) {
    throw new Error('useAppStore must be used inside <AppStoreProvider>');
  }
  return store;
}
