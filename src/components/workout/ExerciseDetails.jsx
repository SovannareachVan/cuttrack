import { useEffect, useRef } from 'react';
import { X, ExternalLink, Repeat, Dumbbell, Timer } from 'lucide-react';
import { youtubeSearchUrl } from '../../data/exercises';
import SetTracker from './SetTracker';

/**
 * Exercise detail modal.
 *
 * Deliberately short: name, a link to watch the movement, and the set table.
 * Technique write-ups were removed because the same generic advice repeated
 * on all 30 exercises made the view feel cluttered without adding anything.
 *
 * Media policy: there is NO video player and NO illustration in CutTrack. The
 * modal links out to a YouTube SEARCH, which opens in a new tab. A search URL
 * can never point at the wrong video, unlike a hard-coded ID.
 *
 * If you later add `imageUrl` to an exercise in exercises.js, that image is
 * shown above the link instead.
 */
export default function ExerciseDetails({
  exercise,
  setData,
  onFieldChange,
  onToggleSet,
  onClose,
}) {
  const dialogRef = useRef(null);

  // Close on Escape and move focus into the dialog when it opens.
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    dialogRef.current?.focus();
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const sets = setData?.sets ?? [];
  const doneCount = sets.filter((set) => set.done).length;

  return (
    <div
      className="modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exercise-modal-title"
        tabIndex={-1}
        ref={dialogRef}
      >
        <div className="modal__header">
          <div>
            <h2 className="modal__title" id="exercise-modal-title">
              {exercise.name}
            </h2>
            <div className="modal__chips">
              <span className="modal__chip">
                <Dumbbell size={13} aria-hidden="true" />
                {exercise.muscle}
              </span>
              <span className="modal__chip">
                <Repeat size={13} aria-hidden="true" />
                {exercise.sets} × {exercise.reps}
              </span>
              <span className="modal__chip">
                <Timer size={13} aria-hidden="true" />
                {exercise.rest}s rest
              </span>
            </div>
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close exercise details"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal__body">
          {/* ---------- Demonstration link ---------- */}
          <section className="modal__section">
            <h3 className="modal__section-title">Watch</h3>

            {exercise.imageUrl ? (
              <img
                className="exercise-image"
                src={exercise.imageUrl}
                alt={`${exercise.name} demonstration`}
                loading="lazy"
              />
            ) : null}

            <a
              className="btn btn--secondary btn--block"
              href={youtubeSearchUrl(exercise.name)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={17} aria-hidden="true" />
              {exercise.name} on YouTube
            </a>
          </section>

          {/* ---------- Set logging ---------- */}
          <section className="modal__section">
            <h3 className="modal__section-title">
              Log your sets
              <span className="modal__section-hint">
                {doneCount} / {sets.length}
              </span>
            </h3>
            <SetTracker
              sets={sets}
              repsTarget={exercise.reps}
              onFieldChange={onFieldChange}
              onToggle={onToggleSet}
            />
          </section>
        </div>

        <div className="modal__footer">
          <button
            type="button"
            className="btn btn--primary btn--block"
            onClick={onClose}
          >
            Save and close
          </button>
        </div>
      </div>
    </div>
  );
}
