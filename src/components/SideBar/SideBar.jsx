import UserMenu from "../UserMenu/UserMenu";
import NavMenu from "../NavMenu/NavMenu";
import { useTheme } from "@mui/material/styles";
import css from "./SideBar.module.css";

export default function SideBar() {
  const theme = useTheme();

  return (
    <nav
      className={css.navMenu}
      style={{
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.text.primary,
      }}
    >
      <UserMenu />
      <NavMenu />
    </nav>
  );
}
