import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, TrendingUp } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', label: 'Today', icon: LayoutDashboard, end: true },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays, end: false },
  { to: '/progress', label: 'Progress', icon: TrendingUp, end: false },
];

/**
 * Bottom navigation for phones. Fixed to the bottom of the viewport and
 * padded with `env(safe-area-inset-bottom)` so it clears the iPhone home bar.
 * CSS hides this on desktop where the sidebar takes over.
 */
export default function MobileNavigation() {
  return (
    <nav className="mobile-nav" aria-label="Main navigation">
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `mobile-nav__item${isActive ? ' mobile-nav__item--active' : ''}`
          }
        >
          {({ isActive }) => (
            <>
              <Icon
                size={21}
                strokeWidth={isActive ? 2.3 : 1.9}
                aria-hidden="true"
              />
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
