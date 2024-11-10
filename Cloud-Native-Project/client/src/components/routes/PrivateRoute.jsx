import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../lib/contexts/AuthContext";

/**
 * PrivateRoute component that restricts access to authenticated users.
 * 
 * This component checks if a user is authenticated using the `useAuth` hook.
 * If the user is not authenticated, it redirects to the login page, preserving
 * the current location state to allow redirection back after successful login.
 * If the user is authenticated, it renders the child components using `Outlet`.
 * 
 * @component
 * @returns {JSX.Element} The rendered component.
 */
const PrivateRoute = () => {
  const { user } = useAuth(); // Get the current user from the authentication context

  const location = useLocation(); // Get the current location

  // If the user is not authenticated, redirect to the home page
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If the user is authenticated, render the child components
  return <Outlet />;
};

export default PrivateRoute;
