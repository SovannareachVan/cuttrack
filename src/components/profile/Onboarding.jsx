import { useState } from 'react';
import { Check, UserPlus, CalendarDays, Repeat } from 'lucide-react';
import {
  PROGRAM_LIST,
  getWorkoutForDay,
  DAY_LABELS,
} from '../../data/programs';

/**
 * First-run setup.
 *
 * The important question comes first: how do you want to plan your training?
 *
 *   Pick each day  (default) — each morning you tap Shoulders / Chest / Back…
 *                    and the app builds that session. Nothing is fixed in advance.
 *   Weekly program — commit to a fixed split like Push/Pull/Legs.
 */
export default function Onboarding({ onCreate }) {
  const [name, setName] = useState('');
  const [mode, setMode] = useState('daily');
  const [programId, setProgramId] = useState(PROGRAM_LIST[0].id);

  return (
    <div className="onboard">
      <div className="onboard__panel">
        <h1 className="onboard__title">CutTrack</h1>
        <p className="onboard__sub">
          Set up a profile to start. Add one for every person who trains — each
          keeps their own plan and history.
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
          <span className="field__label">How do you want to plan?</span>

          <div className="mode-grid">
            <button
              type="button"
              className={`mode${mode === 'daily' ? ' mode--on' : ''}`}
              onClick={() => setMode('daily')}
              aria-pressed={mode === 'daily'}
            >
              <CalendarDays size={22} aria-hidden="true" />
              <strong>Pick each day</strong>
              <small>
                Every session you choose Shoulders, Chest, Legs… at the start.
              </small>
            </button>

            <button
              type="button"
              className={`mode${mode === 'program' ? ' mode--on' : ''}`}
              onClick={() => setMode('program')}
              aria-pressed={mode === 'program'}
            >
              <Repeat size={22} aria-hidden="true" />
              <strong>Weekly program</strong>
              <small>A fixed split. The day decides what you train.</small>
            </button>
          </div>
        </div>

        {mode === 'program' ? (
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
        ) : null}

        <button
          type="button"
          className="btn btn--primary btn--block"
          onClick={() => onCreate(name, programId, mode)}
        >
          <UserPlus size={17} aria-hidden="true" />
          Start training
        </button>
      </div>
    </div>
  );
}
