import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsLoggedIn } from 'redux/selectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const user = useSelector(selectCurrentUser);

  return {
    isLoggedIn,
    user,
  };
};
