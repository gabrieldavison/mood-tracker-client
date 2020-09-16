import React from "react";
import { Router } from "@reach/router";

import Nav from "./Nav";
import Dashboard from "./Dashboard";
import NewEntry from "./NewEntry";

export default function AuthnticatedRoute() {
  return (
    <>
      <Nav />
      <Router>
        <NewEntry path="/new-entry" />
        <Dashboard path="dashboard" />
      </Router>
    </>
  );
}
