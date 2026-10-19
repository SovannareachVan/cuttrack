import { Link } from 'react-router-dom';
import { CalendarDays, CheckCircle2 } from 'lucide-react';

/**
 * The hero card at the top of the dashboard.
 * Shows which workout is scheduled and the set progress.
 *
 * Deliberately minimal: no chips, no muscle lists, no status text. The only
 * extra information is what you need to act on — start, continue, or finish.
 */
export default function TodayWorkout({
  workout,
  greeting,
  totalSets,
  completedSets = 0,
  workoutDone = false,
  onToggleComplete,
}) {
  const percent =
    totalSets === 0 ? 0 : Math.round((completedSets / totalSets) * 100);

  return (
    <section className="hero" aria-labelledby="today-workout-title">
      <div className="hero__eyebrow">{greeting}</div>

      <h1 className="hero__title" id="today-workout-title">
        {workout.name}
      </h1>

      <p className="hero__sub">
        {workout.isRecovery
          ? 'Recovery and walking.'
          : `${workout.exercises.length} exercises · ${workout.estimatedMinutes} min`}
      </p>

      {workout.isRecovery ? null : (
        <div className="progress">
          <div className="progress__meta">
            <span>Sets</span>
            <strong>
              {completedSets} / {totalSets}
            </strong>
          </div>
          <div
            className="progress__track"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Today's set progress"
          >
            <div className="progress__fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
      )}

      <div className="hero__actions">
        {workoutDone ? (
          <div className="done-banner">
            <CheckCircle2 size={22} strokeWidth={2.4} aria-hidden="true" />
            <span>
              <strong>Workout complete.</strong>
              <small>Tap below if you need to undo it.</small>
            </span>
          </div>
        ) : (
          <a className="btn btn--primary btn--block" href="#today-exercises">
            <CalendarDays size={17} aria-hidden="true" />
            {completedSets > 0 ? 'Continue workout' : 'Start workout'}
          </a>
        )}

        <button
          type="button"
          className={`btn btn--block ${
            workoutDone ? 'btn--done' : 'btn--complete'
          }`}
          onClick={onToggleComplete}
          aria-pressed={workoutDone}
        >
          <CheckCircle2 size={18} aria-hidden="true" />
          {workoutDone ? 'Completed — tap to undo' : 'Complete today’s workout'}
        </button>

        <Link className="btn btn--ghost btn--block" to="/calendar">
          View schedule
        </Link>
      </div>
    </section>
  );
}
