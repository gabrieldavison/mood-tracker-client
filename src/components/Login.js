import React, { useState } from "react";

import client from "../feathers";

function Login(props) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  function login(e) {
    e.preventDefault();
    const { username, password } = {
      username: usernameInput,
      password: passwordInput,
    };

    console.log(username);
    console.log(password);

    return client
      .authenticate({
        strategy: "local",
        username,
        password,
      })
      .catch((error) => setErrorMessage(error.message));
  }

  return (
    <form>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
      />
      <button onClick={(e) => login(e)}>Log In</button>
      {errorMessage === undefined ? null : <p>{errorMessage}</p>}
    </form>
  );
}

export default Login;
