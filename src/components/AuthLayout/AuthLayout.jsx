import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../Loader/Loader";
import css from "./AuthLayout.module.css";

export default function AuthLayout() {
  return (
    <main className={css.authPage}>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </main>
  );
}
