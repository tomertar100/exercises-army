import { useState, useEffect } from "react";
import {
  setSessionStorageToken,
  loginToServer,
  registerToServer,
} from "../axios";

const LoginPage: React.FC = () => {
  const [isItLogin, setIsitLogin] = useState<boolean>(true);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    setUsername("");
    setPassword("");
  }, [isItLogin]);

  const onLoginClick = async () => {
    if (username === "" || password === "") {
      alert("missing username or password");
      return;
    }

    const res = await loginToServer(username, password);

    if (res.status === 200) {
      setSessionStorageToken(res.data.accessToken);
      sessionStorage.setItem("user_id", res.data.user_id.toString());
      sessionStorage.setItem("username", username);
      alert("user logged in");
      window.location.href = "app";
    } else {
      alert(res.data);
      return;
    }
  };

  const onRegisterClick = async () => {
    if (username === "" || password === "") {
      alert("missing username or password");
      return;
    }

    const res = await registerToServer(username, password);

    if (res.status === 201) {
      alert("user Registered");

      setIsitLogin(true);
    } else {
      alert(res.data);
      return;
    }
  };

  return (
    <div className="login">
      {!isItLogin ? <h1 className="create-title">Create Accout: </h1> : null}
      {isItLogin ? <h1>Login / signIn</h1> : <h1>Register / signUp</h1>}
      <input
        value={username}
        className="username-input"
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="password-input"
        value={password}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {isItLogin ? (
        <button className="submit-login-button" onClick={() => onLoginClick()}>
          Login
        </button>
      ) : (
        <button
          className="submit-register-button"
          onClick={() => onRegisterClick()}
        >
          Register
        </button>
      )}

      {!isItLogin ? (
        <button
          className="loginform-button"
          onClick={() => {
            alert("user Log-On");

            setIsitLogin(true);
          }}
        >
          already have an account? Login
        </button>
      ) : (
        <button
          className="loginform-button"
          onClick={() => {
            alert("user Registration");

            setIsitLogin(false);
          }}
        >
          dont have an account? Register
        </button>
      )}
    </div>
  );
};

export default LoginPage;
