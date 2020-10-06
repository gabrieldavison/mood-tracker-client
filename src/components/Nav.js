import React from "react";
import { Link } from "@reach/router";
import client from "../utils/feathers";

export default function Nav() {
  function logout() {
    client.logout();
  }

  return (
    <ul>
      <li>
        <Link to="/new-entry">New Entry</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <button onClick={logout}>Log Out</button>
      </li>
    </ul>
  );
}
