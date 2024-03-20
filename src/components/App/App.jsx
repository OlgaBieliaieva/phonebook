import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from 'components/PrivateRoute';
import { RestrictedRoute } from 'components/RestrictedRoute';
import SharedLayout from 'components/SharedLayout/SharedLayout';
import { useAuth } from 'hooks/useAuth';
import { refresh } from 'redux/operations';

const Home = lazy(() => import('../../pages/Home/Home'));
const Signin = lazy(() => import('../../pages/Signin/Signin'));
const Signup = lazy(() => import('../../pages/Signup/Signup'));
const Dashboard = lazy(() => import('../Dashboard/Dashboard'));
const Contacts = lazy(() => import('../../pages/Contacts/Contacts'));
const ContactDetails=lazy(()=> import('../../pages/ContactDetails/ContactDetails'))
// const Cast = lazy(() => import('./Cast/Cast'));
// const Reviews = lazy(() => import('./Reviews/Reviews'));

export default function App() {
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(refresh());
    }
  }, [user, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route
          index
          element={
            <RestrictedRoute
              redirectTo={`contacts/${user?.id}`}
              component={<Signin />}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <RestrictedRoute
              redirectTo={`contacts/${user?.id}`}
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
              element={<PrivateRoute redirectTo="/" component={<ContactDetails />} />}
            />
          </Route>
        </Route>
        {/* <Route path="group/all" element={<Home />}>
            <Route path={`contact/:contactId`} element={<Home />} />
          </Route>
          <Route path="group/:groupId" element={<Home />}>
            <Route path={`contact/:contactId`} element={<Home />} />
          </Route> */}
        {/* <Route path="reviews" element={<Reviews />} /> */}
        {/* </Route> */}
        {/* <Route path="*" element={<Signin />} /> */}
      </Route>
    </Routes>
  );
}

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchContacts } from 'redux/operations';
// import { getError, getIsLoading } from 'redux/selectors';
// import SectionTitle from '../SectionTitle/SectionTitle';
// import ContactForm from '../ContactForm/ContactForm';
// import Filter from '../Filter/Filter';
// import ContactList from '../ContactList/ContactList';
// import css from './App.module.css';

// export default function App() {
//   const dispatch = useDispatch();
//   // const isLoading = useSelector(getIsLoading);
//   // const error = useSelector(getError);

//   useEffect(() => {
//     dispatch(fetchContacts());
//   }, [dispatch]);

//   return (
//     <main className={css.appContainer}>
//       <SectionTitle text="Phonebook" />
//       <ContactForm />
//       <SectionTitle text="Contacts" />
//       <Filter />
//       {/* {isLoading && !error && <b>Request in progress...</b>} */}
//       <ContactList />
//     </main>
//   );
// }
