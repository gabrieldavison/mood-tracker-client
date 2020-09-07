import React from "react";
import { Router } from "@reach/router";

import Nav from "./Nav";
import Quiz from "./Quiz";
import Dashboard from "./Dashboard";

export default function AuthnticatedRoute() {
  return (
    <>
      <Nav />
      <Router>
        <Quiz path="/quiz" />
        <Dashboard path="dashboard" />
      </Router>
    </>
  );
}
