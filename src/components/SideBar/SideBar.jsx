import UserMenu from "../UserMenu/UserMenu";
import NavMenu from "../NavMenu/NavMenu";
import css from "./SideBar.module.css";

export default function SideBar() {
  return (
    <nav className={css.navMenu}>
      <UserMenu />
      <NavMenu />
    </nav>
  );
}
