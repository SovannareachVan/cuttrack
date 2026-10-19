import { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  UserPlus,
  Check,
  Trash2,
  Settings,
  CalendarDays,
} from 'lucide-react';
import {
  ASSIGNABLE_WORKOUTS,
  DAY_LABELS,
  PROGRAM_LIST,
  getWorkoutForDay,
} from '../../data/programs';

/**
 * Switches between people (you, your brother, ...).
 *
 * Every profile keeps its own program and its own history, so switching is
 * instant and never mixes data.
 */
export default function ProfileSwitcher({ store }) {
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newProgram, setNewProgram] = useState(PROGRAM_LIST[0].id);
  const wrapRef = useRef(null);

  const { profiles, activeProfile } = store;

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return undefined;

    function onPointerDown(event) {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    function onKeyDown(event) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  function handleCreate() {
    store.createProfile(newName, newProgram);
    setNewName('');
    setNewProgram(PROGRAM_LIST[0].id);
    setAdding(false);
    setOpen(false);
  }

  function handleDelete(event, profile) {
    event.stopPropagation();
    const ok = window.confirm(
      `Delete ${profile.name} and all of their logged history?\n\nThis cannot be undone.`
    );
    if (ok) store.removeProfile(profile.id);
  }

  return (
    <div className="pswitch" ref={wrapRef}>
      <button
        type="button"
        className="pswitch__btn"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="pswitch__avatar" aria-hidden="true">
          {(activeProfile?.name ?? '?').charAt(0).toUpperCase()}
        </span>
        <span className="pswitch__name">{activeProfile?.name}</span>
        <ChevronDown
          size={16}
          className={`pswitch__caret${open ? ' pswitch__caret--up' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div className="pmenu" role="menu">
          <div className="pmenu__label">Switch profile</div>

          {profiles.map((profile) => (
            <div className="pmenu__row" key={profile.id}>
              <button
                type="button"
                className={`pmenu__item${
                  profile.id === store.activeProfileId ? ' pmenu__item--on' : ''
                }`}
                onClick={() => {
                  store.setActiveProfile(profile.id);
                  setOpen(false);
                }}
                role="menuitem"
              >
                <span className="pswitch__avatar pswitch__avatar--sm" aria-hidden="true">
                  {profile.name.charAt(0).toUpperCase()}
                </span>
                <span className="pmenu__text">
                  <strong>{profile.name}</strong>
                  <small>
                    {PROGRAM_LIST.find((p) => p.id === profile.programId)?.name ??
                      'Program'}
                  </small>
                </span>
                {profile.id === store.activeProfileId ? (
                  <Check size={17} strokeWidth={3} aria-hidden="true" />
                ) : null}
              </button>

              {profiles.length > 1 ? (
                <button
                  type="button"
                  className="pmenu__del"
                  onClick={(event) => handleDelete(event, profile)}
                  aria-label={`Delete ${profile.name}`}
                >
                  <Trash2 size={15} />
                </button>
              ) : null}
            </div>
          ))}

          <div className="pmenu__divider" />

          {adding ? (
            <div className="pmenu__form">
              <input
                className="field__input"
                type="text"
                value={newName}
                placeholder="Name"
                maxLength={24}
                onChange={(event) => setNewName(event.target.value)}
                autoFocus
              />
              <select
                className="field__input"
                value={newProgram}
                onChange={(event) => setNewProgram(event.target.value)}
              >
                {PROGRAM_LIST.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.name}
                  </option>
                ))}
              </select>
              <div className="pmenu__actions">
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => setAdding(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn--primary btn--sm"
                  onClick={handleCreate}
                >
                  Add
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="pmenu__item"
              onClick={() => setAdding(true)}
            >
              <span className="pswitch__avatar pswitch__avatar--sm" aria-hidden="true">
                <UserPlus size={15} />
              </span>
              <span className="pmenu__text">
                <strong>Add profile</strong>
                <small>For another person</small>
              </span>
            </button>
          )}

          <div className="pmenu__divider" />

          <details className="pmenu__details">
            <summary>
              <Settings size={15} aria-hidden="true" />
              Change my program
            </summary>
            <select
              className="field__input"
              value={activeProfile?.programId}
              onChange={(event) =>
                store.setProfileProgram(store.activeProfileId, event.target.value)
              }
            >
              {PROGRAM_LIST.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>
            <p className="pmenu__note">
              Changing program changes upcoming workouts. Past history is kept.
            </p>
          </details>

          <WeekEditor key={store.activeProfileId} store={store} />
        </div>
      ) : null}
    </div>
  );
}

/**
 * Lets a person override any individual day.
 *
 * This is how two people on the same six-day split end up with different
 * schedules: the program stays, but Monday is set to Chest for one of them
 * and Shoulder for the other.
 */
function WeekEditor({ store }) {
  const { activeProfile } = store;
  const [open, setOpen] = useState(false);

  // `customDays` lives in the store, so the selects are controlled directly —
  // no local copy that could drift out of sync.
  const days = activeProfile?.customDays ?? {};

  function save(next) {
    store.setProfileDays(store.activeProfileId, next);
  }

  return (
    <details className="pmenu__details" open={open}>
      <summary
        onClick={(event) => {
          event.preventDefault();
          setOpen((prev) => !prev);
        }}
      >
        <CalendarDays size={15} aria-hidden="true" />
        Edit my week
      </summary>

      <div className="week-editor">
        {DAY_LABELS.map((label, index) => {
          // Monday is 1 in JS day numbers; Sunday is 0.
          const dayNumber = index + 1;
          const current = getWorkoutForDay(
            dayNumber,
            activeProfile?.programId,
            activeProfile?.customDays
          );

          return (
            <label className="week-editor__row" key={label.short}>
              <span className="week-editor__day">{label.long.slice(0, 3)}</span>
              <select
                className="field__input"
                value={current.id}
                onChange={(event) =>
                  save({ ...days, [dayNumber]: event.target.value })
                }
              >
                {ASSIGNABLE_WORKOUTS.map((workout) => (
                  <option key={workout.id} value={workout.id}>
                    {workout.name}
                  </option>
                ))}
              </select>
            </label>
          );
        })}

        <button
          type="button"
          className="btn btn--ghost btn--sm btn--block"
          onClick={() => save({})}
        >
          Reset to program default
        </button>
      </div>
    </details>
  );
}
