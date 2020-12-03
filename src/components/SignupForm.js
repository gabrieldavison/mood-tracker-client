import React, { useState } from "react";
import client from "../utils/feathers";
import { css } from "emotion";
import { colors } from "../utils/colors";
import { Link } from "@reach/router";

function SignupForm(props) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  function signup(e) {
    e.preventDefault();
    const { username, password } = {
      username: usernameInput,
      password: passwordInput,
    };

    console.log(username);
    console.log(password);

    return client
      .service("users")
      .create({ username, password })
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
          margin-top: 2em;
        `}
      >
        <div
          className={css`
            min-width: 40%;
            margin-top: 1em;
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

          <div
            className={css`
              text-align: center;
            `}
          >
            <p>Choose a username and password</p>
            <button onClick={(e) => signup(e)}>Signup </button>{" "}
            <span>
              back to <Link to="/login">login</Link>
            </span>
          </div>
          {errorMessage === undefined ? null : <p>{errorMessage}</p>}
        </div>
      </form>
    </>
  );
}

export default SignupForm;
