/**
 * DATE UTILITIES
 * --------------
 * Everything in CutTrack is keyed by a single string: the ISO date in
 * `YYYY-MM-DD` form (for example "2026-03-14"). That key is used for
 * LocalStorage records, the calendar, and history lookups.
 *
 * Why a string key?
 *  - It is human readable when you inspect storage in DevTools.
 *  - It never depends on timezone parsing rules.
 *  - It is easy to migrate to a database later (just a date column).
 */

/** Converts a Date object to "YYYY-MM-DD" using LOCAL time, not UTC. */
export function toDateKey(date) {
  const d = date instanceof Date ? date : new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Converts "YYYY-MM-DD" back into a local Date at midnight. */
export function fromDateKey(key) {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/** Today as a "YYYY-MM-DD" string. */
export function todayKey() {
  return toDateKey(new Date());
}

/** "Friday, 14 March 2026" */
export function formatLongDate(key) {
  return fromDateKey(key).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** "14 Mar" — compact form used inside cards and calendar cells. */
export function formatShortDate(key) {
  return fromDateKey(key).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

/** "14 Mar 2026" */
export function formatMediumDate(key) {
  return fromDateKey(key).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Adds (or subtracts) days to a date key. Negative values move backwards. */
export function addDays(key, amount) {
  const date = fromDateKey(key);
  date.setDate(date.getDate() + amount);
  return toDateKey(date);
}

/** Whole days between two keys (b - a). Positive means b is later. */
export function daysBetween(a, b) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((fromDateKey(b) - fromDateKey(a)) / msPerDay);
}

/**
 * Greeting based on the current clock.
 * @param {Date} [now]
 * @returns {string} e.g. "Good morning"
 */
export function getGreeting(now = new Date()) {
  const hour = now.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Builds the seven days of the week (Monday → Sunday) that contain `startKey`.
 * Returns only date information — the caller decides which workout to look up,
 * so this function stays free of any dependency on the schedule data.
 *
 * @returns {{ key: string, day: number, short: string, long: string, isToday: boolean }[]}
 */
export function getWeekFrom(startKey, dayLabels) {
  const start = fromDateKey(startKey);
  const todayIndex = (start.getDay() + 6) % 7; // Monday = 0 ... Sunday = 6
  const monday = new Date(start);
  monday.setDate(start.getDate() - todayIndex);

  return dayLabels.map((label, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const key = toDateKey(date);
    return {
      key,
      day: date.getDay(),
      label: label.day,
      short: label.short,
      long: label.long,
      isToday: key === startKey,
    };
  });
}
