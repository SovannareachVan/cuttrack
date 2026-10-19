import { Check } from 'lucide-react';

/**
 * The three-set logging table inside the exercise detail modal.
 *
 * Important behaviour: typing a weight or a repetition NEVER ticks the set.
 * A set is only marked complete by pressing its checkbox, so the progress
 * counters always reflect what you actually finished.
 */
export default function SetTracker({
  sets,
  onFieldChange,
  onToggle,
  repsTarget,
}) {
  return (
    <div className="set-table">
      <div className="set-row set-row--head" aria-hidden="true">
        <span>Set</span>
        <span>Weight (kg)</span>
        <span>Reps</span>
        <span>Done</span>
      </div>

      {sets.map((set, index) => (
        <div
          className={`set-row${set.done ? ' set-row--done' : ''}`}
          key={index}
        >
          <span className="set-row__number">{index + 1}</span>

          <input
            className="set-row__input"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.5"
            placeholder="0"
            value={set.weight}
            onChange={(event) =>
              onFieldChange(index, 'weight', event.target.value)
            }
            aria-label={`Set ${index + 1} weight in kilograms`}
          />

          <input
            className="set-row__input"
            type="number"
            inputMode="numeric"
            min="0"
            step="1"
            placeholder={repsTarget?.split('-')[0] ?? '10'}
            value={set.reps}
            onChange={(event) =>
              onFieldChange(index, 'reps', event.target.value)
            }
            aria-label={`Set ${index + 1} repetitions`}
          />

          <button
            type="button"
            className={`set-check${set.done ? ' set-check--on' : ''}`}
            onClick={() => onToggle(index)}
            aria-pressed={set.done}
            aria-label={`Mark set ${index + 1} as complete`}
          >
            {set.done ? <Check size={16} strokeWidth={3} /> : null}
          </button>
        </div>
      ))}
    </div>
  );
}
