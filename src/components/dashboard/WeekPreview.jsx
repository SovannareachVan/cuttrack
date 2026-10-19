import { useMemo } from 'react';
import { DAY_LABELS, getWorkoutForDay } from '../../data/programs';
import { fromDateKey, getWeekFrom } from '../../utils/dateUtils';

/**
 * A seven-cell preview of the current week: Monday through Sunday.
 * Reads the ACTIVE PROFILE's program, so you and your brother each see their
 * own split. Today's cell is highlighted with the green accent.
 */
export default function WeekPreview({ todayDateKey, programId, customDays }) {
  const week = useMemo(
    () =>
      getWeekFrom(todayDateKey, DAY_LABELS).map((day) => ({
        ...day,
        workout: getWorkoutForDay(day.day, programId, customDays),
      })),
    [todayDateKey, programId, customDays]
  );

  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__title">This week</h2>
      </div>
      <div className="card__body">
        <div className="week-grid">
          {week.map((day) => (
            <div
              key={day.key}
              className={[
                'week-day',
                day.isToday ? 'week-day--today' : '',
                day.workout.isRecovery ? 'week-day--recovery' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              title={`${day.long}: ${day.workout.name}`}
            >
              <div className="week-day__label">{day.short}</div>
              <div className="week-day__date">
                {fromDateKey(day.key).getDate()}
              </div>
              <div className="week-day__name">{day.workout.short}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
