import React, { useState } from "react";
import * as R from "ramda";

import TriggersList from "./triggersList";
import client from "../feathers";
import useForm from "./useForm";
import validate from "../utils/validate";
import XYInput from "./XY-input";

function Quiz() {
  const [triggerInput, setTriggerInput] = useState("");
  const [triggersList, setTriggersList] = useState([]);
  const [happy, setHappy] = useState();
  const [calm, setCalm] = useState();
  const updateHappy = (val) => setHappy(val);
  const updateCalm = (val) => setCalm(val);

  const [errorMessage, setErrorMessage] = useState();
  // const initialValues = {
  //   happy: "50",
  //   calm: "50",
  // };
  const { values, errors, handleChange, handleSubmit } = useForm(
    submit,
    validate
  );

  function addTrigger(e) {
    e.preventDefault();
    setTriggersList(triggersList.concat(triggerInput));
    setTriggerInput("");
  }

  function removeTrigger(e, trigger) {
    e.preventDefault();
    setTriggersList(
      triggersList.filter((currentTrigger) => {
        return currentTrigger !== trigger;
      })
    );
  }

  function submit(values) {
    const { sleep, notes } = values;
    const data = { happy, calm, sleep, triggersList, notes };
    console.log(data);
    client
      .service("log")
      .create(data)
      .catch((error) => setErrorMessage(error.message));
  }

  return (
    <form>
      <XYInput updateHappy={updateHappy} updateCalm={updateCalm} />
      {/* <div>
        <label htmlFor="happy">Happy</label>
        <input
          name="happy"
          type="range"
          min="0"
          max="100"
          value={values.happy || initialValues.happy}
          onChange={handleChange}
        />
        <label htmlFor="calm">Calm</label>
        <input
          name="calm"
          type="range"
          min="0"
          max="100"
          value={values.calm || initialValues.calm}
          onChange={handleChange}
        />
      </div> */}
      <div>
        <label htmlFor="sleep">How many hours did you sleep last night?</label>
        <input
          type="number"
          name="sleep"
          value={values.sleep || ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="triggers">Has anything triggered how you feel?</label>
        <TriggersList
          triggersList={triggersList}
          removeTrigger={removeTrigger}
        />
        <input
          id="triggers"
          value={triggerInput}
          onChange={(e) => setTriggerInput(e.target.value)}
        />
        <button onClick={(e) => addTrigger(e)}>Add</button>
      </div>
      <div>
        <label htmlFor="notes" />
        <textarea
          value={values.notes || ""}
          onChange={handleChange}
          name="notes"
        ></textarea>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {/* <p>{errorMessage === undefined ? null : errorMessage}</p> */}
      {errors === undefined ? null : <p>{errors}</p>}
    </form>
  );
}

export default Quiz;
