import { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Minus, Plus } from 'lucide-react';
import { CARDIO_LIMITS } from '../../data/cardio';

/**
 * Daily cardio card with adjustable settings and a real countdown timer.
 *
 * The timer state and the "cardio complete" flag are deliberately SEPARATE:
 * finishing the countdown does not tick the box for you, and ticking the box
 * does not run the timer. What you record stays under your own control.
 *
 * Note: the countdown keeps running while the tab is open. It is not
 * persisted, because a timer mid-run is meaningless to restore a day later.
 */
export default function CardioTimer({ cardio, onChange }) {
  const [secondsLeft, setSecondsLeft] = useState(
    () => cardio.durationMinutes * 60
  );
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  // The full duration this run is measured against, for the dial percentage.
  const durationTotal = cardio.durationMinutes * 60;

  useEffect(() => {
    if (!running) return undefined;

    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setRunning(false);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [running]);

  function setDuration(minutes) {
    const clamped = Math.min(
      CARDIO_LIMITS.durationMinutes.max,
      Math.max(CARDIO_LIMITS.durationMinutes.min, minutes)
    );
    onChange({ durationMinutes: clamped });
    setRunning(false);
    setFinished(false);
    setSecondsLeft(clamped * 60);
  }

  function adjust(key, delta) {
    const limits = CARDIO_LIMITS[key];
    const next = Math.min(
      limits.max,
      Math.max(limits.min, Number(cardio[key]) + delta)
    );
    onChange({ [key]: next });
  }

  function reset() {
    setRunning(false);
    setFinished(false);
    setSecondsLeft(cardio.durationMinutes * 60);
  }
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const percent =
    durationTotal === 0
      ? 0
      : Math.round(((durationTotal - secondsLeft) / durationTotal) * 100);

  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__title">Daily cardio</h2>
      </div>

      <div className="card__body">
        <div className="cardio">
          {/* ---- Adjustable settings ---- */}
          <div className="cardio__settings">
            <Stepper
              label="Duration"
              unit="min"
              value={cardio.durationMinutes}
              step={CARDIO_LIMITS.durationMinutes.step}
              onDec={() => setDuration(cardio.durationMinutes - 5)}
              onInc={() => setDuration(cardio.durationMinutes + 5)}
            />
            <Stepper
              label="Incline"
              unit="%"
              value={cardio.incline}
              step={CARDIO_LIMITS.incline.step}
              onDec={() => adjust('incline', -CARDIO_LIMITS.incline.step)}
              onInc={() => adjust('incline', CARDIO_LIMITS.incline.step)}
            />
            <Stepper
              label="Speed"
              unit="km/h"
              value={cardio.speed}
              step={CARDIO_LIMITS.speed.step}
              onDec={() => adjust('speed', -CARDIO_LIMITS.speed.step)}
              onInc={() => adjust('speed', CARDIO_LIMITS.speed.step)}
            />
          </div>

          {/* ---- Timer ---- */}
          <div className="timer">
            <div
              className={`timer__dial${running ? ' timer__dial--running' : ''}`}
              role="timer"
              aria-live="off"
              aria-label={`${minutes} minutes ${seconds} seconds remaining`}
              style={{ '--pct': `${percent * 3.6}deg` }}
            >
              <div
                className={`timer__readout${
                  running ? ' timer__readout--running' : ''
                }`}
              >
                {minutes}:{String(seconds).padStart(2, '0')}
              </div>
            </div>

            <div className="timer__controls">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => {
                  setFinished(false);
                  setRunning((prev) => !prev);
                }}
              >
                {running ? (
                  <>
                    <Pause size={15} aria-hidden="true" /> Pause
                  </>
                ) : (
                  <>
                    <Play size={15} aria-hidden="true" />
                    {secondsLeft === durationTotal ? 'Start' : 'Resume'}
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn btn--secondary"
                onClick={reset}
              >
                <RotateCcw size={15} aria-hidden="true" /> Reset
              </button>
            </div>

            {finished ? (
              <p className="timer__note timer__note--ok">Time is up</p>
            ) : running ? (
              <p className="timer__note">{percent}% done</p>
            ) : null}
          </div>

          {/* ---- Manual completion ---- */}
          <label className={`check-pill${cardio.done ? ' check-pill--on' : ''}`}>
            <input
              type="checkbox"
              checked={Boolean(cardio.done)}
              onChange={(event) => onChange({ done: event.target.checked })}
            />
            <span className="check-pill__box" aria-hidden="true">
              <CheckCircle2 size={15} />
            </span>
            <span>
              {cardio.done ? 'Cardio done' : 'Mark cardio complete'}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

function Stepper({ label, value, unit, onDec, onInc }) {
  return (
    <div className="stepper">
      <span className="stepper__label">{label}</span>
      <div className="stepper__controls">
        <button
          type="button"
          className="stepper__btn"
          onClick={onDec}
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          <Minus size={14} />
        </button>
        <span className="stepper__value">
          {value}
          <small>{unit}</small>
        </span>
        <button
          type="button"
          className="stepper__btn"
          onClick={onInc}
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}
