import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, TrendingUp } from 'lucide-react';
import BrandMark from './BrandMark';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays, end: false },
  { to: '/progress', label: 'Progress', icon: TrendingUp, end: false },
];

export default function Sidebar({ store }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <BrandMark />
        <div>
          <div className="sidebar__name">CutTrack</div>
          <div className="sidebar__tagline">Cutting phase</div>
        </div>
      </div>

      {/* The sidebar shows the active profile as a static label. The interactive
          switcher lives in the Topbar, which is the only one of the two that is
          visible on any given breakpoint — so there is never a duplicate menu
          in the DOM. */}
      <div className="sidebar__profile">
        <div className="pswitch__btn pswitch__btn--static">
          <span className="pswitch__avatar" aria-hidden="true">
            {(store.activeProfile?.name ?? '?').charAt(0).toUpperCase()}
          </span>
          <span className="pswitch__name">{store.activeProfile?.name}</span>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Main navigation">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
            }
          >
            <Icon size={19} strokeWidth={2} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        Saved in this browser only.
      </div>
    </aside>
  );
}
