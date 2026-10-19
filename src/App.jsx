import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Sidebar from './components/layout/Sidebar';
import MobileNavigation from './components/layout/MobileNavigation';
import Onboarding from './components/profile/Onboarding';
import DashboardPage from './pages/DashboardPage';
import { AppStoreProvider, useAppStore } from './hooks/useAppStore';

/**
 * Placeholder pages for the remaining stages. They exist so the nav links are
 * never dead.
 */
function ComingSoon({ title }) {
  return (
    <div className="card">
      <div className="card__body">
        <h2 className="card__title">{title}</h2>
      </div>
    </div>
  );
}

function Shell() {
  const store = useAppStore();
  const location = useLocation();

  // No profile yet: show first-run setup instead of the dashboard.
  if (store.profiles.length === 0) {
    return <Onboarding onCreate={store.createProfile} />;
  }

  return (
    <div className="app-shell">
      <Sidebar store={store} />

      <main className="app-main">
        {/* key remounts on navigation so the entrance animation replays */}
        <div className="app-content page-enter" key={location.pathname}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/calendar" element={<ComingSoon title="Calendar" />} />
            <Route path="/progress" element={<ComingSoon title="Progress" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      <MobileNavigation store={store} />
    </div>
  );
}

export default function App() {
  return (
    <AppStoreProvider>
      <Shell />
    </AppStoreProvider>
  );
}
