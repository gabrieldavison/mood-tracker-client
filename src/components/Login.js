import React from "react";
import Header from "./Header";
import LoginForm from "./LoginForm";

export default function Login(props) {
  return (
    <>
      <Header />
      <LoginForm setLogin={props.setLogin} />
    </>
  );
}
