import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />; //replace is used to replace the current route in the history stack so that the user can't go back to the previous page. Ex: after login the user can't go back to the login page to prevent the user from logging in again.
};
export default PrivateRoute;
