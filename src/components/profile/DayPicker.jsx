import React from 'react';
import {
  CalendarDays,
  Sparkles,
  Dumbbell,
  Heart,
  Layers,
  Activity,
  Zap,
  MoveHorizontal,
  RefreshCw,
  Moon,
} from 'lucide-react';
import { DAILY_CHOICES, WORKOUTS } from '../../data/programs';
import { formatLongDate } from '../../utils/dateUtils';

/**
 * Maps the `icon` name stored in programs.js to a real component.
 * The icons are imported explicitly rather than with a namespace import,
 * because `import * as Icons` pulls the entire library into the bundle.
 */
const ICONS = {
  Dumbbell,
  Heart,
  Layers,
  Activity,
  Zap,
  MoveHorizontal,
  RefreshCw,
  Moon,
};

/**
 * WHAT ARE YOU TRAINING TODAY?
 *
 * Shown at the start of any day that has no workout chosen yet. One tap sets
 * the whole session up and drops you straight into it.
 *
 * Days already chosen can be changed from the dashboard, and past days keep
 * whatever was logged.
 */
export default function DayPicker({ dateKey, onChoose, onUseProgram }) {
  return (
    <section className="picker">
      <div className="picker__eyebrow">
        <CalendarDays size={14} aria-hidden="true" />
        {formatLongDate(dateKey)}
      </div>

      <h1 className="picker__title">What are you training today?</h1>
      <p className="picker__sub">
        Pick a body part to set up the session. You can change it any time.
      </p>

      <div className="picker__grid">
        {DAILY_CHOICES.map((choice, index) => {
          const workout = WORKOUTS[choice.workoutId];

          return (
            <button
              key={choice.workoutId}
              type="button"
              className={`pick${
                workout.isRecovery ? ' pick--rest' : ''
              }`}
              style={{ animationDelay: `${Math.min(index, 10) * 35}ms` }}
              onClick={() => onChoose(choice.workoutId)}
            >
              <span className="pick__icon" aria-hidden="true">
                {React.createElement(ICONS[choice.icon] ?? Dumbbell, {
                  size: 22,
                })}
              </span>
              <span className="pick__label">{choice.label}</span>
              <span className="pick__meta">
                {workout.isRecovery
                  ? 'Optional walk'
                  : `${workout.exercises.length} exercises · ${workout.estimatedMinutes} min`}
              </span>
            </button>
          );
        })}
      </div>

      <button type="button" className="btn btn--ghost btn--block" onClick={onUseProgram}>
        <Sparkles size={16} aria-hidden="true" />
        Use my weekly program instead
      </button>
    </section>
  );
}
