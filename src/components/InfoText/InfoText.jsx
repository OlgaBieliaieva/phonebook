import PermContactCalendarSharpIcon from '@mui/icons-material/PermContactCalendarSharp';
import css from "./InfoText.module.css"

export default function InfoText({ text }) {
  return (
    <div className={css.welcomePage}>
      <PermContactCalendarSharpIcon className={css.welcomePageIcon} />
      <p>{text}</p>
    </div>
  );
}
