import { useTheme, Grid } from "@mui/material";
import css from "./PageHeader.module.css";

export default function PageHeader({ title, btnTitle, btnAction, children }) {
  const theme = useTheme();
  return (
    <Grid
      className={css.pageHeaderWrapper}
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <div className={css.titleWrapper}>
        <h1 className={css.pageTitle}>{title}</h1>
        <button
          style={{
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
          }}
          className={css.headerBtn}
          type="button"
          onClick={() => btnAction()}
        >
          {btnTitle}
        </button>
      </div>
      {children}
    </Grid>
  );
}
