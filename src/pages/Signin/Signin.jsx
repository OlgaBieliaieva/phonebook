import LoginForm from 'components/LoginForm/LoginForm';
import css from './Signin.module.css';

export default function Signin() {
  return (
    <div className={css.pageContainer}>
      <div className={css.contentWrapper}>
        <h1 className={css.pageTitle}>
          Keep your contacts in single space with SmartBook
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
