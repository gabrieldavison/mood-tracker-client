import React from "react";
import Quiz from "./Quiz";
import { isEmpty } from "ramda";
import client from "../utils/feathers";
import Header from "./Header";
import Nav from "./Nav";

export default function NewEntry() {
  function submit(data, validate, setErrors) {
    const errors = validate(data);

    if (isEmpty(errors)) {
      console.log(data);
      client
        .service("log")
        .create(data)
        .catch((error) => setErrors(error.message));
    } else {
      setErrors(errors);
    }
  }

  return (
    <>
      <Header />
      <Nav />
      <Quiz submit={submit} clearOnSubmit={true} />;
    </>
  );
}
