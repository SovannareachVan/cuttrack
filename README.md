# CutTrack — Cutting Workout Tracker

A personal gym workout tracker built for a cutting (fat-loss) phase. Multiple
profiles (each with its own program and history), a six-day split plus recovery
day, daily incline-walk cardio, set-by-set weight and repetition logging, and
automatic local saving.

No login. No server. All data is stored in your browser's LocalStorage.

**Status:** the Dashboard is built and working. Calendar and Progress pages are
still placeholders.

---

## Quick start

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually <http://localhost:5173>).

```bash
npm run build   # production build into dist/
npm run preview # serve the production build locally
```

## Tech stack

- React + Vite (JavaScript / JSX)
- Plain CSS design system (`src/styles.css`)
- `lucide-react` for icons
- `react-router-dom` for navigation
- `recharts` for charts (Progress page)
- LocalStorage for persistence (`cuttrack-v2`)


## Project structure

```text
cuttrack/
├── vercel.json        SPA rewrites + build config for Vercel
├── public/
├── src/
│   ├── components/
│   │   ├── layout/       Sidebar, Topbar, MobileNavigation, BrandMark
│   │   ├── dashboard/    TodayWorkout, StatsCards, WeekPreview
│   │   ├── profile/      Onboarding, ProfileSwitcher
│   │   └── workout/      ExerciseCard, ExerciseDetails, SetTracker, CardioTimer
│   ├── data/
│   │   ├── exercises.js  ← edit to change exercises
│   │   ├── programs.js   ← edit to change workouts and weekly splits
│   │   └── cardio.js     cardio defaults and allowed ranges
│   ├── hooks/
│   │   └── useAppStore.jsx  all profiles + records + LocalStorage
│   ├── utils/            dateUtils.js
│   ├── App.jsx           app shell + routes
│   ├── main.jsx          React entry point
│   └── styles.css        entire design system
├── index.html
└── package.json
```

## Profiles

Every person who trains gets their own profile with its own program and its own
history. Data is stored under `cuttrack-v2` in LocalStorage:

```text
cuttrack-v2
├── activeProfileId
└── profiles
    └── p_ab12cd34
        ├── name, programId, customDays
        ├── days:    { "2026-10-19": { workoutId, exercises, cardio, completed } }
        └── weights: { "2026-10-19": 78.4 }
```

- `programId` picks one of the four weekly splits.
- `customDays` optionally overrides individual days, so two people on the same
  split can have different schedules.
- Older `cuttrack-v1` data is migrated into a default profile automatically.

## Editing your plan

1. **Workouts** — `src/data/programs.js`. Edit the `exercises` list of any
   workout in `WORKOUTS`, or add a new one.
2. **Weekly splits** — same file, under `PROGRAMS`. Each maps a day number
   (`0` = Sunday … `6` = Saturday) to a workout id.
3. **Exercises** — `src/data/exercises.js`. Add or edit entries in `EXERCISES`.
4. **Own week** — in the app: profile menu → "Edit my week".

Every exercise id used in a schedule must exist in `exercises.js`.

## Deployment

See the steps below, or the summary at the end of this file.

## Roadmap

- [x] Responsive UI, sidebar, mobile navigation, dashboard cards
- [x] Six-day split and current-day detection
- [x] Exercise detail modal with three-set tracking
- [x] LocalStorage layer
- [x] Cardio settings and countdown timer
- [x] Multi-profile support with per-person programs
- [ ] Calendar page
- [ ] Progress page
- [ ] GitHub + Vercel deployment


## Important notes

- LocalStorage is **per browser and per device**. Your phone and your computer
  do not share data. Clearing site data in your browser deletes your history.
- The workout split is a general editable starting plan, not a personalised
  medical or training prescription. Adjust it to your own experience and to any
  guidance from your coach or clinician.
- Exercise videos are not hard-coded. CutTrack links to a YouTube search built
  from the exercise name, because an invented video ID could point at an
  unrelated video. Add a real `videoId` in `exercises.js` and it is used instead.

## Safety

Speak to a doctor or qualified trainer before starting a new training
programme, particularly if you have any medical condition, injury history, or
are new to resistance training. Stop any activity that causes pain.

---

## Deploy to GitHub and Vercel

### 1. Create the Git repository

```bash
cd cuttrack
git init
git add .
git status              # check nothing sensitive is staged
git commit -m "CutTrack: cutting workout tracker"
```

### 2. Push to GitHub

With the GitHub CLI:

```bash
gh auth login                             # one-time, opens a browser
gh repo create cuttrack --public --push --source=. --description "Cutting workout tracker"
```

Or manually: create an empty repo on github.com, then

```bash
git remote add origin https://github.com/<your-username>/cuttrack.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel

**Via the website**

1. Go to <https://vercel.com/new>
2. Sign in with GitHub.
3. Import the `cuttrack` repository.
4. Vercel detects Vite automatically. Confirm:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Deploy.

**Via the CLI**

```bash
npm install -g vercel
vercel          # first run: log in, link to the project
vercel --prod   # production deploy
```

`vercel.json` already sets the build command, output directory, and the SPA
rewrite that keeps `/calendar` and `/progress` working on refresh.

### 4. Use it

Vercel prints a URL like `https://cuttrack.vercel.app`. Open it on your phone
and add it to your home screen.

### Important: data is per device

History is stored in LocalStorage, so the app on your phone has its own data,
separate from your laptop, and separate from your brother's phone. Clearing
site data, or using private browsing, deletes it. Deploying again does not
delete anything.

