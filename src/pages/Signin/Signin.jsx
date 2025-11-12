import { Typography } from "@mui/material";
import LoginForm from "../../components/LoginForm/LoginForm";
import css from "./Signin.module.css";

export default function Signin() {
  return (
    <div className={css.pageContainer}>
      <div className={css.contentWrapper}>
        <Typography variant="h1">
          Keep your contacts in single space with SmartBook
        </Typography>
        <LoginForm />
      </div>
    </div>
  );
}
