import { useState } from "react";
import axios, {
  setSessionStorageToken,
  loginToServer,
  registerToServer,
} from "../axios";

export type User = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const [isItLogin, setIsitLogin] = useState<boolean>(true);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onLoginClick = async () => {
    if (username === "" || password === "") {
      return;
    }

    const res = await loginToServer(username, password);

    if (res.status === 200) {
      setSessionStorageToken(res.data.accessToken);
      sessionStorage.setItem("user_id", res.data.user_id.toString());

      window.location.href = "app";
    } else {
      alert(res.data);
      return;
    }
  };

  const onRegisterClick = async () => {
    if (username === "" || password === "") {
      return;
    }

    const res = await registerToServer(username, password);

    if (res.status === 201) {
      return onLoginClick();
    } else {
      alert(res.data);
      return;
    }
  };

  return (
    <div className="login">
      {isItLogin ? <h1>Login</h1> : <h1>Register</h1>}
      <input
        className="username-input"
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="password-input"
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {isItLogin ? (
        <button className="submit-login-button" onClick={onLoginClick}>
          {" "}
          Login
        </button>
      ) : (
        <button className="submit-login-button" onClick={onRegisterClick}>
          Register
        </button>
      )}

      {!isItLogin ? (
        <button className="loginform-button" onClick={() => setIsitLogin(true)}>
          already have an account? Login
        </button>
      ) : (
        <button
          className="loginform-button"
          onClick={() => setIsitLogin(false)}
        >
          dont have account? Register
        </button>
      )}
    </div>
  );
};

export default LoginPage;
