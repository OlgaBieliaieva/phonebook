import { useTheme } from "@mui/material/styles";
import css from "./Workspace.module.css";

export default function Workspace({ children }) {
  const theme = useTheme();

  return (
    <div
      className={css.workspace}
      style={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      {children}
    </div>
  );
}
