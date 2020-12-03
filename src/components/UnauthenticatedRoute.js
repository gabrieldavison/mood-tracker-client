import React from "react";
import { Router, Redirect } from "@reach/router";
import Login from "./Login";
import Signup from "./Signup";

export default function UnauthenticatedRoute(props) {
  return (
    <>
      <Router>
        <Redirect from="new-entry" to="/" noThrow />
        <Redirect from="/" to="login" noThrow />
        <Login setLogin={props.setLogin} path="login" />
        <Signup path="sign-up" />
      </Router>
    </>
  );
}
