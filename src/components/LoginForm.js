import React, { useState } from "react";
import client from "../utils/feathers";
import { css } from "emotion";
import { colors } from "../utils/colors";

function LoginForm(props) {
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
    <>
      <form
        className={css`
          label {
            font-size: 2em;
          }
          input {
            display: block;
            width: 100%;
            height: 2em;
            background-color: ${colors.light} !important;
            margin: 1em 0;
          }
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: auto;
        `}
      >
        <div
          className={css`
            min-width: 40%;
            margin-top: 3em;
          `}
        >
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
          <button
            className={css`
              display: block;
            `}
            onClick={(e) => login(e)}
          >
            Log In
          </button>
          {errorMessage === undefined ? null : <p>{errorMessage}</p>}
        </div>
      </form>
    </>
  );
}

export default LoginForm;
