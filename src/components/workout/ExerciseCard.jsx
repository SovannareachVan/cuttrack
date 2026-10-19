import { ChevronRight, Repeat, Dumbbell, Check } from 'lucide-react';

/**
 * A single exercise row in the day's list.
 *
 * Rendered as a real <button> so it is keyboard reachable, announces its
 * purpose to screen readers, and can be opened with one thumb.
 *
 * The entrance animation delay is derived from the index, so the list
 * cascades in rather than appearing all at once.
 */
export default function ExerciseCard({
  exercise,
  index,
  doneSets,
  totalSets,
  onOpen,
}) {
  const complete = totalSets > 0 && doneSets === totalSets;

  return (
    <button
      type="button"
      className={`exercise-card${complete ? ' exercise-card--done' : ''}`}
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
      onClick={() => onOpen(exercise)}
    >
      <div className="exercise-card__index" aria-hidden="true">
        {complete ? <Check size={17} strokeWidth={3} /> : index + 1}
      </div>

      <div className="exercise-card__main">
        <h3 className="exercise-card__name">{exercise.name}</h3>
        <div className="exercise-card__meta">
          <span>
            <Dumbbell size={13} aria-hidden="true" />
            {exercise.muscle}
          </span>
          <span>
            <Repeat size={13} aria-hidden="true" />
            {exercise.sets} × {exercise.reps}
          </span>
        </div>
        <span className="exercise-card__progress">
          {doneSets} / {totalSets} sets
        </span>
      </div>

      <ChevronRight
        className="exercise-card__chevron"
        size={19}
        aria-hidden="true"
      />
    </button>
  );
}
