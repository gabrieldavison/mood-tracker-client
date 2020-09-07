import React from "react";
import { useEffect, useContext } from "react";
import { LoginContext } from "./App";

export default function Calendar() {
  const login = useContext(LoginContext);
  useEffect(() => {
    console.log(login);
  });
  return (
    <div>
      <h1>Calendar</h1>
    </div>
  );
}
