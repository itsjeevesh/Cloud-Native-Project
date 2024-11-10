import {
  useGetUserData,
  useLogoutUser,
} from "../lib/react-query/queriesAndMutations";
import { useToast } from "../lib/contexts/ToastContext";
import DataDisplay from "../components/ui/DataDisplay";
import { useEffect } from "react";
import Loader from "../components/shared/Loader";

const Dashboard = () => {
  const { mutate: logout } = useLogoutUser();

  const { showToast } = useToast();

  const { data, isLoading, isError, error } = useGetUserData();

  useEffect(() => {
    if (isError) {
      showToast(error.message, true);
    }
  }, [isError]);

  if (isLoading) {
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
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontFamily: "Montserrat", textAlign: "center" }}>
          Dashboard
        </h1>
        <h2 style={{ fontFamily: "Abeezee" }}>User Details</h2>
        <DataDisplay data={data} />
        <button
          onClick={() => {
            logout();
            showToast("Logged out", false);
          }}
          className="logout-button"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
