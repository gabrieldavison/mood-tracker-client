import React from "react";
import { Redirect, Router } from "@reach/router";
import Dashboard from "./Dashboard";
import NewEntry from "./NewEntry";
import Visualize from "./Visualize";
export default function AuthenticatedRoute() {
  return (
    <>
      <Router>
        <Redirect from="/login" to="/" noThrow />
        <Redirect from="/" to="new-entry" noThrow />
        <NewEntry path="new-entry" />
        <Dashboard path="dashboard" />
        <Visualize path="visualize" />
      </Router>
    </>
  );
}
