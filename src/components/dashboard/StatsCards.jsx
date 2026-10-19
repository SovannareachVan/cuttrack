import { Dumbbell, Layers, Timer, Footprints } from 'lucide-react';

/**
 * A row of four compact statistic cards.
 * On phones: 2 columns. On tablets and up: 4 columns (see styles.css).
 *
 * @param {object} props
 * @param {number} props.exerciseCount  number of exercises in today's workout
 * @param {number} props.totalSets      sets across all of today's exercises
 * @param {number} props.completedSets  sets already ticked off (Stage 3+)
 * @param {number} props.estimatedMinutes planned session length
 * @param {number} props.cardioMinutes  daily cardio target in minutes
 * @param {boolean} props.cardioDone    whether cardio is marked complete
 */
export default function StatsCards({
  exerciseCount,
  totalSets,
  completedSets = 0,
  estimatedMinutes,
  cardioMinutes,
  cardioDone = false,
}) {
  const cards = [
    { icon: Dumbbell, value: exerciseCount, label: 'Exercises' },
    {
      icon: Layers,
      value: `${completedSets}/${totalSets}`,
      label: 'Sets done',
    },
    { icon: Timer, value: `${estimatedMinutes} min`, label: 'Est. duration' },
    {
      icon: Footprints,
      value: `${cardioMinutes} min`,
      label: cardioDone ? 'Cardio done' : 'Incline walk',
      muted: !cardioDone,
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map(({ icon: Icon, value, label, muted }) => (
        <div className="stat" key={label}>
          <div
            className={`stat__icon${muted ? ' stat__icon--warn' : ''}`}
            aria-hidden="true"
          >
            <Icon size={16} strokeWidth={2.2} />
          </div>
          <div className="stat__value">{value}</div>
          <div className="stat__label">{label}</div>
        </div>
      ))}
    </div>
  );
}
