/**
 * WORKOUT LIBRARY + PROGRAM TEMPLATES
 * -----------------------------------
 * Two levels:
 *
 *   WORKOUTS  a single session, e.g. shoulder_day. Reusable by any program.
 *   PROGRAMS  a weekly split, mapping each day of the week to a workout id.
 *             This is what each person chooses when they set up CutTrack.
 *
 * A program is just a lookup: { 1: 'shoulder_day', 2: 'chest_day', ... }
 * where 0 = Sunday and 6 = Saturday.
 *
 * To customise: edit any workout's `exercises` list below (ids must exist in
 * src/data/exercises.js), or add a new program in PROGRAMS.
 *
 * These are general, editable starting plans — not personalised medical or
 * training prescriptions. Adjust them to your own experience.
 */

export const WORKOUTS = {
  /* ---------------- Six-day split ---------------- */
  shoulder_day: {
    id: 'shoulder_day',
    name: 'Shoulder Day',
    short: 'Shldr',
    focus: ['Shoulders', 'Rear delts'],
    estimatedMinutes: 60,
    exercises: [
      'db_shoulder_press',
      'lateral_raise',
      'arnold_press',
      'upright_row',
      'reverse_fly',
      'face_pull',
    ],
  },
  chest_day: {
    id: 'chest_day',
    name: 'Chest Day',
    short: 'Chest',
    focus: ['Chest', 'Triceps'],
    estimatedMinutes: 65,
    exercises: [
      'bench_press',
      'incline_db_press',
      'push_up',
      'cable_fly',
      'dumbbell_pullover',
      'chest_dip',
    ],
  },
  arm_day: {
    id: 'arm_day',
    name: 'Arm Day',
    short: 'Arms',
    focus: ['Biceps', 'Triceps'],
    estimatedMinutes: 55,
    exercises: [
      'close_grip_bench',
      'barbell_curl',
      'triceps_pushdown',
      'hammer_curl',
      'overhead_triceps_ext',
      'preacher_curl',
    ],
  },
  leg_day: {
    id: 'leg_day',
    name: 'Leg Day',
    short: 'Legs',
    focus: ['Quads', 'Hamstrings', 'Calves'],
    estimatedMinutes: 75,
    exercises: [
      'leg_press',
      'leg_curl',
      'romanian_deadlift',
      'leg_extension',
      'walking_lunge',
      'standing_calf_raise',
    ],
  },
  back_day: {
    id: 'back_day',
    name: 'Back Day',
    short: 'Back',
    focus: ['Lats', 'Mid back'],
    estimatedMinutes: 65,
    exercises: [
      'lat_pulldown',
      'barbell_row',
      'seated_cable_row',
      'single_arm_db_row',
      'straight_arm_pulldown',
      'dumbbell_shrug',
    ],
  },
  upper_body_day: {
    id: 'upper_body_day',
    name: 'Upper Body Day',
    short: 'Upper',
    focus: ['Chest', 'Back', 'Shoulders'],
    estimatedMinutes: 70,
    exercises: [
      'incline_db_bench',
      'pull_up',
      'db_shoulder_press',
      'seated_cable_row',
      'cable_lateral_raise',
      'ez_bar_curl',
    ],
  },

  /* ---------------- Push / Pull / Legs ---------------- */
  push_day: {
    id: 'push_day',
    name: 'Push Day',
    short: 'Push',
    focus: ['Chest', 'Shoulders', 'Triceps'],
    estimatedMinutes: 70,
    exercises: [
      'bench_press',
      'db_shoulder_press',
      'incline_db_press',
      'cable_lateral_raise',
      'close_grip_bench',
      'triceps_pushdown',
    ],
  },
  pull_day: {
    id: 'pull_day',
    name: 'Pull Day',
    short: 'Pull',
    focus: ['Back', 'Biceps'],
    estimatedMinutes: 70,
    exercises: [
      'pull_up',
      'barbell_row',
      'lat_pulldown',
      'seated_cable_row',
      'barbell_curl',
      'hammer_curl',
    ],
  },
  legs_day: {
    id: 'legs_day',
    name: 'Legs Day',
    short: 'Legs',
    focus: ['Quads', 'Hamstrings', 'Calves'],
    estimatedMinutes: 70,
    exercises: [
      'leg_press',
      'leg_extension',
      'leg_curl',
      'romanian_deadlift',
      'walking_lunge',
      'standing_calf_raise',
    ],
  },

  /* ---------------- Upper / Lower ---------------- */
  upper_a: {
    id: 'upper_a',
    name: 'Upper A',
    short: 'Up A',
    focus: ['Chest', 'Back', 'Shoulders'],
    estimatedMinutes: 65,
    exercises: [
      'bench_press',
      'barbell_row',
      'db_shoulder_press',
      'lat_pulldown',
      'cable_lateral_raise',
      'ez_bar_curl',
    ],
  },
  lower_a: {
    id: 'lower_a',
    name: 'Lower A',
    short: 'Lo A',
    focus: ['Quads', 'Hamstrings'],
    estimatedMinutes: 70,
    exercises: [
      'leg_press',
      'leg_curl',
      'leg_extension',
      'romanian_deadlift',
      'standing_calf_raise',
      'walking_lunge',
    ],
  },
  upper_b: {
    id: 'upper_b',
    name: 'Upper B',
    short: 'Up B',
    focus: ['Chest', 'Back', 'Shoulders'],
    estimatedMinutes: 65,
    exercises: [
      'incline_db_bench',
      'pull_up',
      'db_shoulder_press',
      'seated_cable_row',
      'lateral_raise',
      'preacher_curl',
    ],
  },
  lower_b: {
    id: 'lower_b',
    name: 'Lower B',
    short: 'Lo B',
    focus: ['Glutes', 'Calves'],
    estimatedMinutes: 70,
    exercises: [
      'romanian_deadlift',
      'leg_press',
      'leg_extension',
      'leg_curl',
      'walking_lunge',
      'standing_calf_raise',
    ],
  },

  /* ---------------- Full body ---------------- */
  full_body_a: {
    id: 'full_body_a',
    name: 'Full Body A',
    short: 'Full A',
    focus: ['Push', 'Pull', 'Legs'],
    estimatedMinutes: 55,
    exercises: [
      'bench_press',
      'barbell_row',
      'leg_press',
      'db_shoulder_press',
      'lat_pulldown',
      'standing_calf_raise',
    ],
  },
  full_body_b: {
    id: 'full_body_b',
    name: 'Full Body B',
    short: 'Full B',
    focus: ['Pull', 'Push', 'Legs'],
    estimatedMinutes: 55,
    exercises: [
      'pull_up',
      'incline_db_press',
      'leg_curl',
      'seated_cable_row',
      'cable_lateral_raise',
      'triceps_pushdown',
    ],
  },

  /* ---------------- Recovery ---------------- */
  recovery_day: {
    id: 'recovery_day',
    name: 'Recovery Day',
    short: 'Rest',
    focus: ['Walking', 'Mobility'],
    estimatedMinutes: 35,
    isRecovery: true,
    exercises: [],
  },
};

const REST = 'recovery_day';

/**
 * Weekly programs a person can pick during setup.
 * `days` maps JS day number -> workout id (0 = Sunday ... 6 = Saturday).
 */
export const PROGRAMS = {
  six_day: {
    id: 'six_day',
    name: '6-Day Split',
    tagline: 'One body part per day',
    daysPerWeek: 6,
    days: {
      1: 'shoulder_day',
      2: 'chest_day',
      3: 'arm_day',
      4: 'leg_day',
      5: 'back_day',
      6: 'upper_body_day',
      0: REST,
    },
  },
  push_pull_legs: {
    id: 'push_pull_legs',
    name: 'Push / Pull / Legs',
    tagline: 'Chest+shoulders, back+arms, legs',
    daysPerWeek: 6,
    days: {
      1: 'push_day',
      2: 'pull_day',
      3: 'legs_day',
      4: 'push_day',
      5: 'pull_day',
      6: 'legs_day',
      0: REST,
    },
  },
  upper_lower: {
    id: 'upper_lower',
    name: 'Upper / Lower',
    tagline: 'Upper and lower body, alternating',
    daysPerWeek: 6,
    days: {
      1: 'upper_a',
      2: 'lower_a',
      3: 'upper_b',
      4: 'lower_b',
      5: 'upper_a',
      6: 'lower_b',
      0: REST,
    },
  },
  full_body: {
    id: 'full_body',
    name: 'Full Body',
    tagline: 'Short whole-body sessions',
    daysPerWeek: 6,
    days: {
      1: 'full_body_a',
      2: 'full_body_b',
      3: 'full_body_a',
      4: 'full_body_b',
      5: 'full_body_a',
      6: 'full_body_b',
      0: REST,
    },
  },
};

/** Program list in the order they appear in the picker. */
export const PROGRAM_LIST = Object.values(PROGRAMS);

/** The program used when none is chosen. */
export const DEFAULT_PROGRAM_ID = 'six_day';

/**
 * Returns the workout scheduled on a given JS day number for a program.
 *
 * `customDays` is an optional per-profile override, e.g.
 *   { 1: 'chest_day', 3: 'leg_day' }
 * Only the days present in the override are changed; the rest fall back to
 * the program. Pass `null` to use the program as-is.
 *
 * Unknown program, day or workout id falls back to recovery, so bad data can
 * never crash the app.
 */
export function getWorkoutForDay(dayNumber, programId, customDays = null) {
  const program = PROGRAMS[programId] ?? PROGRAMS[DEFAULT_PROGRAM_ID];
  const workoutId = customDays?.[dayNumber] ?? program.days[dayNumber] ?? REST;
  return WORKOUTS[workoutId] ?? WORKOUTS[REST];
}

/** Every workout that can be assigned to a day, for the week editor. */
export const ASSIGNABLE_WORKOUTS = Object.values(WORKOUTS);

/** Short day labels, Monday first. */
export const DAY_LABELS = [
  { short: 'Mon', long: 'Monday' },
  { short: 'Tue', long: 'Tuesday' },
  { short: 'Wed', long: 'Wednesday' },
  { short: 'Thu', long: 'Thursday' },
  { short: 'Fri', long: 'Friday' },
  { short: 'Sat', long: 'Saturday' },
  { short: 'Sun', long: 'Sunday' },
];
