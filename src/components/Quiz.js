import React, { useState, useEffect, useRef } from "react";
import * as R from "ramda";

import TriggersList from "./triggersList";
import client from "../feathers";
import useForm from "./useForm";
import validate from "../utils/validate";
import XYInput from "./XYInput";

function Quiz() {
  const [triggerInput, setTriggerInput] = useState("");
  const [triggersList, setTriggersList] = useState([]);
  const [happy, setHappy] = useState();
  const [calm, setCalm] = useState();
  const [errors, setErrors] = useState([]);

  // const updateHappy = (val) => setHappy(val);
  // const updateCalm = (val) => setCalm(val);

  let happySlider = useRef();
  let calmSlider = useRef();

  useEffect(() => {
    happySlider.current = document.getElementById("happy");
    calmSlider.current = document.getElementById("calm");
  }, []);

  function setHappySlider(val) {
    happySlider.current.value = val;
    setHappy(val);
  }

  function setCalmSlider(val) {
    calmSlider.current.value = val;
    setCalm(val);
  }

  const { values, handleChange, handleSubmit } = useForm(submit);

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

    const newErrors = validate(data);

    if (R.isEmpty(newErrors)) {
      console.log(data);
      client
        .service("log")
        .create(data)
        .catch((error) => setErrors(error.message));
    } else {
      setErrors(newErrors);
    }
  }

  return (
    <form>
      <XYInput setHappySlider={setHappySlider} setCalmSlider={setCalmSlider} />
      <div>
        <label htmlFor="">Sad</label>
        <input
          id="happy"
          name="happy"
          type="range"
          min="0"
          max="100"
          value={happy || ""}
          onChange={(e) => setHappy(e.target.value)}
        />
        <label htmlFor="happy">Happy</label>
        <label htmlFor="">Anxious</label>
        <input
          id="calm"
          name="calm"
          type="range"
          min="0"
          max="100"
          value={calm || ""}
          onChange={(e) => setCalm(e.target.value)}
        />
        <label htmlFor="calm">Calm</label>
      </div>
      <div>
        <label htmlFor="sleep">How many hours did you sleep last night?</label>
        <input
          type="number"
          name="sleep"
          value={values.sleep || ""}
          onChange={(e) => handleChange(e.target.value, e.target.name)}
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
        <label htmlFor="notes">Notes</label>
        <textarea
          value={values.notes || ""}
          onChange={handleChange}
          name="notes"
        ></textarea>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {/* <p>{errorMessage === undefined ? null : errorMessage}</p> */}
      {R.isEmpty(errors)
        ? null
        : errors.map((error, i) => <p key={i}>{error}</p>)}
    </form>
  );
}

export default Quiz;
