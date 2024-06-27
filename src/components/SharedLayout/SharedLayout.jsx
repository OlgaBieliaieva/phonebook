import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../Loader/Loader';
import css from './SharedLayout.module.css';

export default function SharedLayout() {
  return (
    <main>
      <div className={css.mainContainer}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
}
