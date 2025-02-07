import { useSelector } from "react-redux";
import {
  selectUser,
  selectStatuses,
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../redux/auth/selectors";

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const statusList = useSelector(selectStatuses);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    statusList,
  };
};
