import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../lib/contexts/AuthContext";

/**
 * PublicRoute component to handle routing for public pages.
 *
 * This component checks if a user is authenticated. If the user is authenticated,
 * it redirects them to the dashboard. If the user is not authenticated, it renders
 * the child components.
 *
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
const PublicRoute = () => {
  const { user } = useAuth(); // Get the current user from the authentication context

  const location = useLocation(); // Get the current location

  // If the user is authenticated, redirect to the dasboard page
  if (user) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  // If the user is not authenticated, render the child components
  return <Outlet />;
};

export default PublicRoute;
