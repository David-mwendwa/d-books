import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './index';

const PrivateRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to='/signin' replace />;
  }
  return children;
};
export default PrivateRoute;
