import React from "react";
import Quiz from "./Quiz";
import { isEmpty } from "ramda";
import client from "../utils/feathers";
import { css } from "emotion";
export default function CalendarSidebar(props) {
  const closeButtonContainer = css`
    text-align: right;
    width: 80%;
  `;
  const closeButton = css`
    padding: 0.5em;
  `;

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
      <div className={closeButtonContainer}>
        <button
          className={closeButton}
          onClick={() => props.setShowEntry(false)}
        >
          X
        </button>
      </div>
      <Quiz
        selectedEntry={props.selectedEntry}
        submit={submit}
        handleDelete={handleDelete}
      />
    </>
  );
}
