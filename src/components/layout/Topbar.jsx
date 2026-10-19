import BrandMark from './BrandMark';
import ProfileSwitcher from '../profile/ProfileSwitcher';

/**
 * Topbar shown on phones and tablets. On desktop the sidebar carries the
 * brand, so the topbar is hidden by CSS instead of being unmounted —
 * that keeps the two layouts visually consistent when resizing the window.
 *
 * The date lives in the date bar directly below this, so it is not repeated
 * here. The right side holds the profile switcher.
 */
export default function Topbar({ store }) {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <BrandMark className="topbar__logo" size={17} />
        <div className="topbar__title">CutTrack</div>
      </div>

      <div className="topbar__right">
        <ProfileSwitcher store={store} />
      </div>
    </header>
  );
}
