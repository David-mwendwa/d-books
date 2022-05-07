import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './index';

const AdminRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to='/signin' replace />;
  }
  if (isAuthenticated() && isAuthenticated().user.role === 0) {
    return <Navigate to='/user/dashboard' replace />;
  }
  return children;
};

export default AdminRoute;
