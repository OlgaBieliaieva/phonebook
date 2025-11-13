import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../PrivateRoute";
import { RestrictedRoute } from "../RestrictedRoute";
import SharedLayout from "../SharedLayout/SharedLayout";
import { useAuth } from "../../hooks/useAuth";
import { refresh } from "../../redux/auth/operations";
import Loader from "../Loader/Loader";

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

export default function App() {
  const dispatch = useDispatch(); // eslint-disable-next-line
  const { isRefreshing, user } = useAuth();

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  if (isRefreshing) return <Loader />;

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {/* Для неавторизованих користувачів */}
        <Route
          index
          element={
            <RestrictedRoute redirectTo="/dashboard" component={<Signin />} />
          }
        />
        <Route
          path="signup"
          element={
            <RestrictedRoute redirectTo="/dashboard" component={<Signup />} />
          }
        />

        {/* Для авторизованих користувачів */}
        <Route
          path="dashboard"
          element={<PrivateRoute redirectTo="/" component={<Dashboard />} />}
        />

        <Route
          path="contacts"
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
          path="groups"
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
  );
}
