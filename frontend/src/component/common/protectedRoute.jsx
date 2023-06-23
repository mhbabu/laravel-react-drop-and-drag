import { Navigate, useLocation } from "react-router-dom";
import auth from "../../services/auth/authService";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  return auth.getCurrentUser() ? children : <Navigate to='/' state={{ from: location }} /> ;
};

export default ProtectedRoute;
