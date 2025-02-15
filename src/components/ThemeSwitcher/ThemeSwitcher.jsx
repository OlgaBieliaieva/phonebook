import { useTheme } from "../../context/ThemeContext";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function ThemeSwitcher() {
  const { toggleTheme, mode } = useTheme();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
}
