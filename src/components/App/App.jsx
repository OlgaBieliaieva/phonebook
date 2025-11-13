import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../PrivateRoute";
import { RestrictedRoute } from "../RestrictedRoute";
import SharedLayout from "../SharedLayout/SharedLayout";
import { useAuth } from "../../hooks/useAuth";
import { refresh } from "../../redux/auth/operations";
import Loader from "../Loader/Loader";

// Pages
const Signin = lazy(() => import("../../pages/Signin/Signin"));
const Signup = lazy(() => import("../../pages/Signup/Signup"));
const Dashboard = lazy(() => import("../../pages/Dashboard/Dashboard"));
const Contacts = lazy(() => import("../../pages/Contacts/Contacts"));
const ContactDetails = lazy(() =>
  import("../../pages/ContactDetails/ContactDetails")
);
const Groups = lazy(() => import("../../pages/Groups/Groups"));
const GroupDetails = lazy(() =>
  import("../../pages/GroupDetails/GroupDetails")
);

// Layouts
const AuthLayout = lazy(() => import("../AuthLayout/AuthLayout"));

export default function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  if (isRefreshing) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Layout без сайдбару для auth */}
        <Route element={<AuthLayout />}>
          <Route
            path="/"
            element={
              <RestrictedRoute redirectTo="/dashboard" component={<Signin />} />
            }
          />
          <Route
            path="/signup"
            element={
              <RestrictedRoute redirectTo="/dashboard" component={<Signup />} />
            }
          />
        </Route>

        {/* Основний layout із сайдбаром */}
        <Route element={<SharedLayout />}>
          <Route
            path="/dashboard"
            element={<PrivateRoute redirectTo="/" component={<Dashboard />} />}
          />
          <Route
            path="/contacts"
            element={<PrivateRoute redirectTo="/" component={<Contacts />} />}
          >
            <Route
              path=":contactId"
              element={
                <PrivateRoute redirectTo="/" component={<ContactDetails />} />
              }
            />
          </Route>
          <Route
            path="/groups"
            element={<PrivateRoute redirectTo="/" component={<Groups />} />}
          >
            <Route
              path=":groupId"
              element={
                <PrivateRoute redirectTo="/" component={<GroupDetails />} />
              }
            />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
