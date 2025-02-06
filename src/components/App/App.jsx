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

const Home = lazy(() => import("../../pages/Home/Home"));
const Signin = lazy(() => import("../../pages/Signin/Signin"));
const Signup = lazy(() => import("../../pages/Signup/Signup"));
const Dashboard = lazy(() => import("../Dashboard/Dashboard"));
const Contacts = lazy(() => import("../../pages/Contacts/Contacts"));
const ContactDetails = lazy(() =>
  import("../../pages/ContactDetails/ContactDetails")
);
const Groups = lazy(() => import("../../pages/Groups/Groups"));
const GroupDetails = lazy(() =>
  import("../../pages/GroupDetails/GroupDetails")
);

export default function App() {
  const dispatch = useDispatch();
  const { isRefreshing, user } = useAuth();

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route
          index
          element={
            <RestrictedRoute
              redirectTo={`/contacts/${user?.id}`}
              component={<Signin />}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <RestrictedRoute
              redirectTo={`/contacts/${user?.id}`}
              component={<Signup />}
            />
          }
        />

        <Route
          path="/contacts/:userId"
          element={<PrivateRoute redirectTo="/" component={<Home />} />}
        >
          <Route
            index
            element={<PrivateRoute redirectTo="/" component={<Dashboard />} />}
          />
          <Route
            path="all"
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
              path=":group"
              element={
                <PrivateRoute redirectTo="/" component={<GroupDetails />} />
              }
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
