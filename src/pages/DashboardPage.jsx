import { useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

import Topbar from '../components/layout/Topbar';
import TodayWorkout from '../components/dashboard/TodayWorkout';
import StatsCards from '../components/dashboard/StatsCards';
import WeekPreview from '../components/dashboard/WeekPreview';
import ExerciseCard from '../components/workout/ExerciseCard';
import ExerciseDetails from '../components/workout/ExerciseDetails';
import CardioTimer from '../components/workout/CardioTimer';

import { getWorkoutForDay } from '../data/programs';
import { getExercise } from '../data/exercises';
import { useAppStore } from '../hooks/useAppStore';
import {
  addDays,
  formatLongDate,
  fromDateKey,
  getGreeting,
  todayKey,
} from '../utils/dateUtils';

export default function DashboardPage() {
  // Which day we are looking at. Changing this never touches another day's
  // record, because every write is keyed by `dateKey` within the profile.
  const [dateKey, setDateKey] = useState(todayKey());
  const [openExercise, setOpenExercise] = useState(null);

  const store = useAppStore();
  const { activeProfile } = store;

  const dayNumber = fromDateKey(dateKey).getDay();
  const workout = getWorkoutForDay(
    dayNumber,
    activeProfile?.programId,
    activeProfile?.customDays
  );

  // Resolve ids to real exercises. A bad id is skipped rather than crashing.
  const exercises = workout.exercises.map((id) => getExercise(id)).filter(Boolean);

  const record = store.getDay(dateKey, workout, exercises);

  const totalSets = exercises.reduce((sum, item) => sum + item.sets, 0);

  // Count completed sets by reading every exercise's set array. This is
  // derived from saved data, never stored as a separate counter.
  const completedSets = exercises.reduce((sum, exercise) => {
    const sets = record.exercises[exercise.id]?.sets ?? [];
    return sum + sets.filter((set) => set.done).length;
  }, 0);

  const isToday = dateKey === todayKey();
  const isFuture = dateKey > todayKey();

  // Stable identity, otherwise the modal's Escape/focus effect would re-run
  // on every keystroke typed into the set table.
  const closeModal = useCallback(() => setOpenExercise(null), []);

  function doneSetsFor(exercise) {
    const sets = record.exercises[exercise.id]?.sets ?? [];
    return sets.filter((set) => set.done).length;
  }

  function handleReset() {
    const confirmed = window.confirm(
      `Delete the saved record for ${formatLongDate(dateKey)}?\n\n` +
        'This removes all logged sets, cardio and completion status for that ' +
        'day. It cannot be undone.'
    );
    if (confirmed) store.resetDay(dateKey);
  }

  return (
    <>
      <Topbar store={store} />

      {/* ---- Date navigation ---- */}
      <nav className="datebar" aria-label="Select workout date">
        <button
          type="button"
          className="icon-btn"
          onClick={() => setDateKey((key) => addDays(key, -1))}
          aria-label="Previous day"
        >
          <ChevronLeft size={18} />
        </button>

        <span className="datebar__label">
          {formatLongDate(dateKey)}
          <small>
            {isToday ? 'Today' : isFuture ? 'Planned' : 'Past session'}
          </small>
        </span>

        <button
          type="button"
          className="icon-btn"
          onClick={() => setDateKey((key) => addDays(key, 1))}
          aria-label="Next day"
        >
          <ChevronRight size={18} />
        </button>
      </nav>

      {!isToday ? (
        <button
          type="button"
          className="btn btn--secondary btn--block"
          style={{ marginBottom: 14 }}
          onClick={() => setDateKey(todayKey())}
        >
          Back to today
        </button>
      ) : null}

      <div className="dashboard-grid">
        {/* ---- Main column ---- */}
        <div className="dashboard-col__main">
          <TodayWorkout
            workout={workout}
            greeting={isToday ? getGreeting() : 'Viewing'}
            totalSets={totalSets}
            completedSets={completedSets}
            workoutDone={Boolean(record.completed)}
            onToggleComplete={() =>
              store.setWorkoutComplete(dateKey, !record.completed)
            }
          />

            <div className="section" id="today-exercises">
              <div className="section__head">
                <h2 className="section__title">
                  {workout.isRecovery ? 'Recovery' : 'Exercises'}
                </h2>
                <span className="section__hint">{totalSets} sets</span>
              </div>

            {exercises.length === 0 ? (
              <div className="card">
                <div className="card__body">
                  <p className="hero__sub" style={{ marginTop: 0 }}>
                    No heavy training scheduled. Take a 20–30 minute easy
                    walk, do some light mobility work, and get a full night's
                    sleep.
                  </p>
                </div>
              </div>
            ) : (
              <div className="exercise-list">
                {exercises.map((exercise, index) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    index={index}
                    totalSets={exercise.sets}
                    doneSets={doneSetsFor(exercise)}
                    onOpen={setOpenExercise}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ---- Reset (the complete button lives in the hero) ---- */}
          <div className="section">
            <button
              type="button"
              className="btn btn--ghost btn--block"
              onClick={handleReset}
            >
              <RotateCcw size={16} aria-hidden="true" />
              Reset this day
            </button>
          </div>
        </div>

        {/* ---- Side column ---- */}
        <div className="dashboard-col__side">
          <StatsCards
            exerciseCount={exercises.length}
            totalSets={totalSets}
            completedSets={completedSets}
            estimatedMinutes={workout.estimatedMinutes}
            cardioMinutes={record.cardio.durationMinutes}
            cardioDone={Boolean(record.cardio.done)}
          />

          <WeekPreview
            todayDateKey={todayKey()}
            programId={activeProfile?.programId}
            customDays={activeProfile?.customDays}
          />

          <CardioTimer
            cardio={record.cardio}
            onChange={(patch) => store.setCardio(dateKey, patch)}
          />
        </div>
      </div>

      {/* ---- Exercise modal ---- */}
      {openExercise ? (
        <ExerciseDetails
          exercise={openExercise}
          setData={record.exercises[openExercise.id]}
          onFieldChange={(setIndex, field, value) =>
            store.setSetField(dateKey, openExercise.id, setIndex, field, value)
          }
          onToggleSet={(setIndex) =>
            store.toggleSet(dateKey, openExercise.id, setIndex)
          }
          onClose={closeModal}
        />
      ) : null}
    </>
  );
}
