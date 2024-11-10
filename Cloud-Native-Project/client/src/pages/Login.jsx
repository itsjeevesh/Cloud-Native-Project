import { useState, useEffect } from "react";
import TextInput from "../components/shared/TextInput";
import { useLoginUser } from "../lib/react-query/queriesAndMutations";
import { useToast } from "../lib/contexts/ToastContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    mutateAsync: login,
    isPending: isLoging,
    isError,
    error,
  } = useLoginUser();

  const { showToast } = useToast();

  useEffect(() => {
    if (isError) {
      showToast(error.message, true);
    }
  }, [isError]);

  const handleSubmit = async (e) => {
    e.preventDefault();;
    await login({ email, password });
  };

  return (
    <div className="login-page-container">
      <div className="login-form">
        <h1 style={{ fontFamily: "Montserrat", textAlign: "center" }}>Login</h1>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "30px" }}
          onSubmit={handleSubmit}
        >
          <TextInput
            placeholder="Enter email"
            label="Email"
            value={email}
            setState={setEmail}
            type="email"
          />
          <TextInput
            placeholder="Enter Password"
            label="Password"
            type="password"
            value={password}
            setState={setPassword}
          />
          <button type="submit" className="login-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
