import React from "react";
import { Redirect, Router } from "@reach/router";

import Nav from "./Nav";
import Dashboard from "./Dashboard";
import NewEntry from "./NewEntry";

export default function AuthenticatedRoute() {
  return (
    <>
      <Nav />
      <Router>
        <Redirect from="/" to="new-entry" noThrow />
        <NewEntry path="new-entry" />
        <Dashboard path="dashboard" />
      </Router>
    </>
  );
}
