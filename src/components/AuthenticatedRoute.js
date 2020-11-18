import React from "react";
import { Redirect, Router } from "@reach/router";

import Nav from "./Nav";
import Dashboard from "./Dashboard";
import NewEntry from "./NewEntry";
import Header from "./Header";
import Visualize from "./Visualize";

export default function AuthenticatedRoute() {
  return (
    <>
      <Router>
        <Redirect from="/" to="new-entry" noThrow />
        <NewEntry path="new-entry" />
        <Dashboard path="dashboard" />
        <Visualize path="visualize" />
      </Router>
    </>
  );
}
