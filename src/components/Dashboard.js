import React from "react";
import CalenderContainer from "./Calendar";
import Header from "./Header";
import Nav from "./Nav";

export default function Dashboard() {
  return (
    <>
      <Header />
      <Nav />
      <CalenderContainer />
    </>
  );
}
