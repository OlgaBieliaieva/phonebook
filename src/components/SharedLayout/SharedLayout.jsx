import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
// import { Link } from './SharedLayout.styled';
import css from './SharedLayout.module.css';

export default function SharedLayout() {
  return (
    <main>
      <div className={css.mainContainer}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
      {/* <header className={css.header}>
        <nav className={css.nav}>
          <ul className={css.nav__list}>
            <li>
              <Link to="/" end className={css.nav__link}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/movies" className={css.nav__link}>
                Movies
              </Link>
            </li>
          </ul>
        </nav>
      </header> */}
    </main>
  );
}
