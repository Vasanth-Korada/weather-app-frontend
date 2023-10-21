import { Navigate } from 'react-router-dom';
import "../styles/App.css"

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const NotFound = () => {
  return (
    <div className="Not-found" >
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist</p>
    </div>
  );
};
