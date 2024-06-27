import SignupForm from "../../components/SignupForm/SignupForm";
import css from "./Signup.module.css";

export default function Signup() {
  return (
    <div className={css.pageContainer}>
      <div className={css.contentWrapper}>
        <h1 className={css.pageTitle}>
          Keep your contacts in single space with SmartBook
        </h1>
        <SignupForm />
      </div>
    </div>
  );
}
