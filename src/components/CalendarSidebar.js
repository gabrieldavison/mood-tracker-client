import React from "react";
import Quiz from "./Quiz";
import { isEmpty } from "ramda";
import client from "../utils/feathers";

export default function CalendarSidebar(props) {
  function submit(data, validate, setErrors) {
    const errors = validate(data);
    const entryId = props.selectedEntry._id;

    if (isEmpty(errors)) {
      console.log(data);
      client
        .service("log")
        .patch(entryId, data)
        .catch((error) => setErrors(error.message));
      props.setShowEntry(false);
    } else {
      setErrors(errors);
    }
  }

  function handleDelete() {
    client.service("log").remove(props.selectedEntry._id);
    props.setSelectedEntry(undefined);
    props.getCalendarEntries();
    props.setShowEntry(false);
  }

  return (
    <>
      <Quiz
        selectedEntry={props.selectedEntry}
        submit={submit}
        handleDelete={handleDelete}
      />
      <button onClick={() => props.setShowEntry(false)}>Close</button>
    </>
  );
}
