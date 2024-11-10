import { createContext, useState, useContext } from "react";
import Toast from "../../components/shared/Toast";

const ToastContext = createContext();

/**
 * ToastProvider component that provides toast notification functionality to its children.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the toast context.
 * @returns {JSX.Element} The ToastProvider component with context and Toast component.
 * @example
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 */
export const ToastProvider = ({ children }) => {
  // State to manage the toast's message, error status, and visibility
  const [toast, setToast] = useState({
    message: "",
    isError: false,
    isOpen: false,
  });

  /**
   * Displays a toast notification with the given message.
   *
   * @param {string} message - The message to display in the toast.
   * @param {boolean} isError - Indicates if the toast is an error message.
   */
  const showToast = (message, isError) => {
    setToast({ message: message, isError: isError, isOpen: true });
  };

  /**
   * Hides the toast notification by resetting its state.
   * Sets the message to an empty string, isError to false, and isOpen to false.
   */
  const hideToast = () => {
    setToast(prevToast => ({ ...prevToast, isOpen: false }));
  };

  return (
    // Provide the showToast and hideToast functions to the context
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {/* Render the Toast component with the current toast state */}
      <Toast toast={toast} />
    </ToastContext.Provider>
  );
};

/**
 * Custom hook to access the Toast context.
 * 
 * @returns {Object} The context value of ToastContext.
 * @throws {Error} If the hook is used outside of a ToastProvider.
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
