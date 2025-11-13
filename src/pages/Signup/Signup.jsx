import { Typography } from "@mui/material";
import SignupForm from "../../components/SignupForm/SignupForm";
import css from "./Signup.module.css";

export default function Signup() {
  return (
    <div className={css.pageContainer}>
      <div className={css.contentWrapper}>
        <Typography variant="h1" color="primary.dark" className={css.pageTitle}>
          Keep your contacts in single space with SmartBook
        </Typography>
        <SignupForm />
      </div>
    </div>
  );
}
