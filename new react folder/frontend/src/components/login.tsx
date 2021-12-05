import React, { useEffect, useState } from "react";
import axios, {
  setSessionStorageToken,
  loginToServer,
  registerToServer,
} from "../axios";

const LoginPage = () => {
  const [isItLogin, setIsitLogin] = useState<boolean>(true);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onLoginClick = async () => {
    if (username == "" || password == "") {
      return;
    }

    const res = await loginToServer(username, password);

    if (res.status === 200) {
      setSessionStorageToken(res.data.accessToken);

      window.location.href = "app";
    } else {
      alert(res.data);
      return;
    }
  };

  const onRegisterClick = async () => {
    if (username == "" || password == "") {
      return;
    }

    const res = await registerToServer(username, password);

    if (res.status == 201) {
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
        <button onClick={onLoginClick}> Login</button>
      ) : (
        <button onClick={onRegisterClick}>Register</button>
      )}

      <button className="loginform-button" onClick={() => setIsitLogin(true)}>
        login
      </button>
      <button className="loginform-button" onClick={() => setIsitLogin(false)}>
        register
      </button>
    </div>
  );
};

export default LoginPage;
