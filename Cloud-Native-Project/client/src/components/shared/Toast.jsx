import { useState } from "react";
import { useToast } from "../../lib/contexts/ToastContext";
import ErrorIcon from "/icons/error.svg";
import SuccessIcon from "/icons/success.svg";
import SVG from "react-inlinesvg";

/**
 * Toast component to display notification messages.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.toast - Toast object containing the message and status.
 * @param {boolean} props.toast.isOpen - Indicates if the toast is open.
 * @param {boolean} props.toast.isError - Indicates if the toast is an error message.
 * @param {string} props.toast.message - The message to display in the toast.
 * @returns {JSX.Element} The rendered Toast component.
 */
const Toast = ({ toast }) => {  
  // Get the hideToast function from the ToastContext
  const { hideToast } = useToast();
  const [bottom, setBottom] = useState(-250);

  setTimeout(() => {
    setBottom(10);
  }, 500);

  // Automatically hide the toast after 3 seconds
  if (toast.isOpen) {
    setTimeout(() => {
      hideToast();
    }, 3000);
  }

  return (
    <div
      style={{ bottom: `${bottom}px` }}
      className={`${toast.isOpen ? "slide-in-left" : "slide-out-left"} toast`}
    >
      {/* Toast status */}
      <span style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {toast.isError ? (
          <SVG src={ErrorIcon} height={45} width={45} />
        ) : (
          <SVG src={SuccessIcon} height={45} width={45} />
        )}
        <p
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "bold",
            fontSize: "1.25rem",
          }}
        >
          {toast.isError ? "Error" : "Success"}
        </p>
      </span>

      {/* Toast Message */}
      <p style={{ fontFamily: "ABeeZee, sans-serif", fontSize: "1.125rem" }}>
        {toast.message ? toast?.message : "An Unexpected Error Occurred"}
      </p>

      {/* Close timer */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "black",
          height: "5px",
          width: "100%",
          left: 0,
        }}
        className={`${toast.isOpen && "width-out"}`}
      />
    </div>
  );
};

export default Toast;
