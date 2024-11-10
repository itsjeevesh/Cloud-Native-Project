import { createContext, useContext, useEffect } from "react";
import { useGetUser } from "../react-query/queriesAndMutations";
import { useToast } from "./ToastContext";
import Loader from "../../components/shared/Loader";

const AuthContext = createContext();

/**
 * AuthProvider component that provides authentication context to its children.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const AuthProvider = ({ children }) => {
  // Get the showToast function from the ToastContext
  const { showToast } = useToast();

  // Fetch user data using the useGetUser hook
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useGetUser();

  // Show a toast message if there is an error fetching user data
  useEffect(() => {
    if (isUserError) {
      showToast(userError.message, true);
    }
  }, [isUserError]);

  // Display a loading screen while user data is being fetched
  if (isUserLoading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader size="40px" color="#65675b" />
        <p>Loading</p>
      </div>
    );
  }

  // Display an error message if there is an error fetching user data
  if (isUserError) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "1.875rem",
          }}
        >
          A fatal error has occurred. Please try again later.
        </h2>
      </div>
    );
  }

  // Provide the user data to the children components
  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access the authentication context.
 *
 * @returns {Object} The authentication context value.
 * @throws {Error} If the hook is used outside of an AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Check if the context is undefined, which means the hook is used outside of an AuthProvider
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // Return the authentication context value
  return context;
};
