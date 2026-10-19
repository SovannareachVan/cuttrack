/**
 * EXERCISE LIBRARY
 * ----------------
 * Every workout in schedule.js references exercises from this file by `id`.
 *
 * Each exercise object supports:
 *   id          unique key (used by the storage layer)
 *   name        display name
 *   muscle      target muscle group
 *   equipment   what you need
 *   sets        number of working sets
 *   reps        default target repetition range
 *   rest        recommended rest in seconds
 *   cue         short one-line reminder
 *
 * MEDIA
 * -----
 * There is no video player in CutTrack. Each exercise shows a static
 * illustration instead:
 *
 *   imageUrl   OPTIONAL. Set this to a real image URL (one you host or trust)
 *              and the app shows that photo. Leave it undefined and the app
 *              draws a muscle map from the `muscle` field instead.
 *
 * We deliberately do not hard-code guessed image or YouTube IDs: a wrong ID
 * silently shows an unrelated or broken item. `youtubeSearchUrl()` is the only
 * external link, and it is an optional extra at the bottom of the detail view.
 *
 * To add a photo: drop the file in `public/` and set, for example,
 *   imageUrl: '/exercises/barbell-bench-press.jpg'
 */

export const EXERCISES = {
  barbell_shoulder_press: {
    id: 'barbell_shoulder_press',
    name: 'Barbell Shoulder Press',
    muscle: 'Shoulders',
    equipment: 'Barbell',
    sets: 3,
    reps: '10-12',
    rest: 90,
    cue: 'Keep ribs down, press up and slightly back.',
  },
  lateral_raise: {
    id: 'lateral_raise',
    name: 'Dumbbell Lateral Raise',
    muscle: 'Side delts',
    equipment: 'Dumbbells',
    sets: 3,
    reps: '12-15',
    rest: 60,
    cue: 'Lead with the elbows, stop at shoulder height.',
  },
  face_pull: {
    id: 'face_pull',
    name: 'Face Pull',
    muscle: 'Rear delts / traps',
    equipment: 'Rope',
    sets: 3,
    reps: '12-15',
    rest: 60,
    cue: 'Pull the rope to the forehead, rotate thumbs back.',
  },
  reverse_fly: {
    id: 'reverse_fly',
    name: 'Reverse Pec Deck',
    muscle: 'Rear delts',
    equipment: 'Machine',
    sets: 3,
    reps: '12-15',
    rest: 60,
    cue: 'Chest pinned to the pad, sweep arms wide.',
  },
  upright_row: {
    id: 'upright_row',
    name: 'Cable Upright Row',
    muscle: 'Trap / shoulders',
    equipment: 'Cable',
    sets: 3,
    reps: '10-12',
    rest: 75,
    cue: 'Elbows stay high and in front of the body.',
  },
  arnold_press: {
    id: 'arnold_press',
    name: 'Arnold Press',
    muscle: 'Shoulders',
    equipment: 'Dumbbells',
    sets: 3,
    reps: '10-12',
    rest: 75,
    cue: 'Rotate palms outward as you press.',
  },

  bench_press: {
    id: 'bench_press',
    name: 'Barbell Bench Press',
    muscle: 'Chest',
    equipment: 'Barbell',
    sets: 3,
    reps: '8-10',
    rest: 120,
    cue: 'Shoulder blades pinned, bar touches mid-chest.',
  },
  incline_db_press: {
    id: 'incline_db_press',
    name: 'Incline Dumbbell Press',
    muscle: 'Upper chest',
    equipment: 'Dumbbells',
    sets: 3,
    reps: '10-12',
    rest: 90,
    cue: 'Bench at 30 degrees, control the lowering phase.',
  },
  cable_fly: {
    id: 'cable_fly',
    name: 'Cable Crossover',
    muscle: 'Chest',
    equipment: 'Cable',
    sets: 3,
    reps: '12-15',
    rest: 60,
    cue: 'Soft elbows, hug across the body.',
  },
  push_up: {
    id: 'push_up',
    name: 'Push-Up',
    muscle: 'Chest / triceps',
    equipment: 'Bodyweight',
    sets: 3,
    reps: '15-20',
    rest: 60,
    cue: 'One straight line from heels to head.',
  },
  dumbbell_pullover: {
    id: 'dumbbell_pullover',
    name: 'Dumbbell Pullover',
    muscle: 'Chest / lats',
    equipment: 'Dumbbell',
    sets: 3,
    reps: '12-15',
    rest: 60,
    cue: 'Bend only at the hips, stretch at the top.',
  },
  chest_dip: {
    id: 'chest_dip',
    name: 'Chest Dip',
    muscle: 'Chest / triceps',
    equipment: 'Dip bars',
    sets: 3,
    reps: '8-12',
    rest: 90,
    cue: 'Lean forward for chest, stay upright for triceps.',
  },

  close_grip_bench: {
    id: 'close_grip_bench',
    name: 'Close-Grip Bench Press',
    muscle: 'Triceps',
    equipment: 'Barbell',
    sets: 3,
    reps: '8-10',
    rest: 90,
    cue: 'Hands shoulder-width, elbows tucked to the ribs.',
  },
  triceps_pushdown: {
    id: 'triceps_pushdown',
    name: 'Triceps Rope Pushdown',
    muscle: 'Triceps',
    equipment: 'Cable',
    sets: 3,
    reps: '12-15',
    rest: 60,
    cue: 'Elbows pinned to the sides, spread the rope at the end.',
  },
  overhead_triceps_ext: {
    id: 'overhead_triceps_ext',
    name: 'Overhead Triceps Extension',
    muscle: 'Triceps',
    equipment: 'Dumbbell',
    sets: 3,
    reps: '10-12',
    rest: 75,
    cue: 'Keep elbows pointing forward, no lower back arch.',
  },
  barbell_curl: {
    id: 'barbell_curl',
    name: 'Barbell Biceps Curl',
    muscle: 'Biceps',
    equipment: 'Barbell',
    sets: 3,
    reps: '10-12',
    rest: 75,
    cue: 'No swinging, squeeze at the top.',
  },
  hammer_curl: {
    id: 'hammer_curl',
    name: 'Hammer Curl',
    muscle: 'Biceps / forearms',
    equipment: 'Dumbbells',
    sets: 3,
    reps: '12-15',
    rest: 60,
    cue: 'Neutral grip, keep elbows close to the ribs.',
  },
  preacher_curl: {
    id: 'preacher_curl',
    name: 'Preacher Curl',
    muscle: 'Biceps',
    equipment: 'Machine',
    sets: 3,
    reps: '10-12',
    rest: 60,
    cue: 'Arms stay on the pad, full stretch at the bottom.',
  },

  leg_press: {
    id: 'leg_press',
    name: 'Leg Press',
    muscle: 'Quads / glutes',
    equipment: 'Machine',
    sets: 3,
    reps: '10-12',
    rest: 120,
    cue: 'Knees track over toes, do not lock them out hard.',
  },
  leg_extension: {
    id: 'leg_extension',
    name: 'Leg Extension',
    muscle: 'Quads',
    equipment: 'Machine',
    sets: 3,
    reps: '12-15',
    rest: 60,
    cue: 'Squeeze the quads for one second at the top.',
  },
  leg_curl: {
    id: 'leg_curl',
    name: 'Lying Leg Curl',
    muscle: 'Hamstrings',
    equipment: 'Machine',
    sets: 3,
    reps: '10-12',
    rest: 75,
    cue: 'Keep hips pressed into the pad, curl slowly.',
  },
  romanian_deadlift: {
    id: 'romanian_deadlift',
    name: 'Romanian Deadlift',
    muscle: 'Hamstrings / glutes',
    equipment: 'Barbell',
    sets: 3,
    reps: '10-12',
    rest: 120,
    cue: 'Hinge at the hips, bar stays close to the legs.',
  },
  standing_calf_raise: {
    id: 'standing_calf_raise',
    name: 'Standing Calf Raise',
    muscle: 'Calves',
    equipment: 'Machine',
    sets: 3,
    reps: '15-20',
    rest: 45,
    cue: 'Full stretch at the bottom, hard squeeze on top.',
  },
  walking_lunge: {
    id: 'walking_lunge',
    name: 'Walking Lunge',
    muscle: 'Glutes / legs',
    equipment: 'Dumbbells',
    sets: 3,
    reps: '10-12 each side',
    rest: 90,
    cue: 'Long stride, upright torso, push through the front heel.',
  },

  lat_pulldown: {
    id: 'lat_pulldown',
    name: 'Lat Pulldown',
    muscle: 'Back / biceps',
    equipment: 'Cable',
    sets: 3,
    reps: '10-12',
    rest: 90,
    cue: 'Pull to the collarbone, let the lats stretch at the top.',
  },
  barbell_row: {
    id: 'barbell_row',
    name: 'Barbell Row',
    muscle: 'Mid back',
    equipment: 'Barbell',
    sets: 3,
    reps: '10-12',
    rest: 90,
    cue: 'Flat back, pull toward the hips, no torso bounce.',
  },
  seated_cable_row: {
    id: 'seated_cable_row',
    name: 'Seated Cable Row',
    muscle: 'Mid back',
    equipment: 'Cable',
    sets: 3,
    reps: '10-12',
    rest: 75,
    cue: 'Chest tall, squeeze the shoulder blades together.',
  },
  single_arm_db_row: {
    id: 'single_arm_db_row',
    name: 'Single-Arm Dumbbell Row',
    muscle: 'Lats',
    equipment: 'Dumbbells',
    sets: 3,
    reps: '10-12 each side',
    rest: 75,
    cue: 'Brace the torso, pull the elbow past the hip.',
  },
  straight_arm_pulldown: {
    id: 'straight_arm_pulldown',
    name: 'Straight-Arm Pulldown',
    muscle: 'Lats',
    equipment: 'Cable',
    sets: 3,
    reps: '12-15',
    rest: 60,
    cue: 'Arms stay straight, hinge from the hips only.',
  },
  dumbbell_shrug: {
    id: 'dumbbell_shrug',
    name: 'Dumbbell Shrug',
    muscle: 'Traps',
    equipment: 'Dumbbells',
    sets: 3,
    reps: '12-15',
    rest: 60,
    cue: 'Straight up and down, shoulders to the ears.',
  },

  incline_db_bench: {
    id: 'incline_db_bench',
    name: 'Incline Dumbbell Bench Press',
    muscle: 'Upper chest',
    equipment: 'Dumbbells',
    sets: 3,
    reps: '10-12',
    rest: 90,
    cue: 'Press up and slightly inward.',
  },
  pull_up: {
    id: 'pull_up',
    name: 'Pull-Up',
    muscle: 'Back / biceps',
    equipment: 'Bar',
    sets: 3,
    reps: '6-10',
    rest: 120,
    cue: 'Start from a dead hang, pull elbows down to the ribs.',
  },
  db_shoulder_press: {
    id: 'db_shoulder_press',
    name: 'Dumbbell Shoulder Press',
    muscle: 'Shoulders',
    equipment: 'Dumbbells',
    sets: 3,
    reps: '10-12',
    rest: 75,
    cue: 'Stack wrists over elbows, no lower back arch.',
  },
  machine_chest_press: {
    id: 'machine_chest_press',
    name: 'Machine Chest Press',
    muscle: 'Chest',
    equipment: 'Machine',
    sets: 3,
    reps: '10-12',
    rest: 75,
    cue: 'Elbows slightly behind the torso, control the return.',
  },
  cable_lateral_raise: {
    id: 'cable_lateral_raise',
    name: 'Cable Lateral Raise',
    muscle: 'Side delts',
    equipment: 'Cable',
    sets: 3,
    reps: '12-15',
    rest: 60,
    cue: 'Constant tension, stop at shoulder height.',
  },
  ez_bar_curl: {
    id: 'ez_bar_curl',
    name: 'EZ-Bar Curl',
    muscle: 'Biceps',
    equipment: 'EZ bar',
    sets: 3,
    reps: '10-12',
    rest: 75,
    cue: 'Grip slightly narrower than shoulder width.',
  },
};

/** Lookup helper so components never index the object directly. */
export function getExercise(id) {
  return EXERCISES[id] ?? null;
}

/**
 * Builds a YouTube *search* URL. Used only for the optional tutorial link at
 * the bottom of the exercise detail view — there is no video player in the app.
 */
export function youtubeSearchUrl(exerciseName) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${exerciseName} exercise form tutorial`
  )}`;
}
