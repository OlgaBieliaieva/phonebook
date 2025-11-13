import { useAuth } from "../../hooks/useAuth";
import ImportContactsSharpIcon from "@mui/icons-material/ImportContactsSharp";
import css from "./Dashboard.module.css";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className={css.welcomePage}>
      <ImportContactsSharpIcon sx={{ width: "64px", height: "64px" }} />
      <p>{user?.name}&#44;</p>
      <p>welcome to SmartBook</p>
    </div>
  );
}
