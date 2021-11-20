import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [isItLogin, setIsitLogin] = useState<boolean>(true);

  return (
    <div className="login">
      {isItLogin ? <h1>Login</h1> : <h1>register</h1>}
      <input type="text" placeholder="username" />
      <input type="password" placeholder="password" />
      <button onClick={() => setIsitLogin(true)}>login</button>
      <button onClick={() => setIsitLogin(false)}>register</button>
      <Link to="/app">
        {isItLogin ? <button>login</button> : <button>Register</button>}
      </Link>
    </div>
  );
};

export default LoginPage;
