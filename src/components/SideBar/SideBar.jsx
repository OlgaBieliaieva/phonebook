import UserMenu from 'components/UserMenu/UserMenu';
import NavMenu from 'components/NavMenu/NavMenu';
import css from './SideBar.module.css';

export default function SideBar() {
  return (
    <aside className={css.navMenu}>
      <UserMenu />
      <NavMenu />
    </aside>
  );
}
