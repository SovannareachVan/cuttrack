/**
 * CARDIO DEFAULTS
 * ----------------
 * The daily treadmill incline walk that accompanies every training day.
 * The user can change duration, incline and speed at runtime from Stage 5.
 *
 * Ranges are deliberately conservative. Adjust them to your own level.
 */
export const DEFAULT_CARDIO = {
  durationMinutes: 20,
  incline: 10,
  speed: 4,
};

/** Limits enforced by the cardio settings form. */
export const CARDIO_LIMITS = {
  durationMinutes: { min: 5, max: 60, step: 5 },
  incline: { min: 0, max: 15, step: 0.5 },
  speed: { min: 2, max: 8, step: 0.5 },
};
