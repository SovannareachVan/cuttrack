import { useState } from 'react';
import { Check, UserPlus } from 'lucide-react';
import { PROGRAM_LIST, getWorkoutForDay, DAY_LABELS } from '../../data/programs';

/**
 * First-run setup.
 *
 * Shown once, when no profile exists. Two choices:
 *   1. who is training (so you and your brother keep separate history)
 *   2. which program they follow
 *
 * Later, more profiles are added from the profile switcher.
 */
export default function Onboarding({ onCreate }) {
  const [name, setName] = useState('');
  const [programId, setProgramId] = useState(PROGRAM_LIST[0].id);

  return (
    <div className="onboard">
      <div className="onboard__panel">
        <h1 className="onboard__title">CutTrack</h1>
        <p className="onboard__sub">
          Set up a profile to start logging. Add one for every person who
          trains — each keeps their own program and history.
        </p>

        <label className="field">
          <span className="field__label">Name</span>
          <input
            className="field__input"
            type="text"
            value={name}
            placeholder="e.g. Sovann"
            onChange={(event) => setName(event.target.value)}
            maxLength={24}
            autoFocus
          />
        </label>

        <div className="field">
          <span className="field__label">Training program</span>
          <div className="program-grid">
            {PROGRAM_LIST.map((program) => (
              <button
                key={program.id}
                type="button"
                className={`program${
                  program.id === programId ? ' program--on' : ''
                }`}
                onClick={() => setProgramId(program.id)}
                aria-pressed={program.id === programId}
              >
                <span className="program__name">
                  {program.name}
                  {program.id === programId ? (
                    <Check size={15} strokeWidth={3} aria-hidden="true" />
                  ) : null}
                </span>
                <span className="program__tagline">{program.tagline}</span>
                <span className="program__days">
                  {DAY_LABELS.map((label, index) => {
                    // DAY_LABELS starts on Monday; JS day numbers start Sunday,
                    // so Monday is 1.
                    const workout = getWorkoutForDay(index + 1, program.id);
                    return (
                      <span
                        key={label.short}
                        className={`program__day${
                          workout.isRecovery ? ' program__day--rest' : ''
                        }`}
                        title={`${label.long}: ${workout.name}`}
                      >
                        {label.short[0]}
                        <small>{workout.short}</small>
                      </span>
                    );
                  })}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="btn btn--primary btn--block"
          onClick={() => onCreate(name, programId)}
        >
          <UserPlus size={17} aria-hidden="true" />
          Start training
        </button>
      </div>
    </div>
  );
}
