import React, { useState, useEffect, useRef } from "react";
import * as R from "ramda";
import TriggersList from "./triggersList";
import validate from "../utils/validate";
import XYInput from "./XYInput";

function Quiz(props) {
  const [happy, setHappy] = useState();
  const [calm, setCalm] = useState();
  const [triggerInput, setTriggerInput] = useState("");
  const [triggersList, setTriggersList] = useState([]);
  const [sleep, setSleep] = useState();
  const [notes, setNotes] = useState();

  const [errors, setErrors] = useState([]);

  //Sets up event listeners
  let happySlider = useRef();
  let calmSlider = useRef();
  let canvas = useRef();
  let ctx = useRef();

  useEffect(() => {
    happySlider.current = document.getElementById("happy");
    calmSlider.current = document.getElementById("calm");
    canvas.current = document.getElementById("canvas");
    ctx.current = canvas.current.getContext("2d");
  }, []);

  //Pre populates data if passed a selected entry
  useEffect(() => {
    const selectedEntry = props.selectedEntry;

    if (selectedEntry) {
      setHappy(selectedEntry.happy);
      setCalm(selectedEntry.calm);
      setTriggersList(selectedEntry.triggersList);
      setSleep(selectedEntry.sleep);
      setNotes(selectedEntry.notes);
    }
  }, [props]);

  function setHappySlider(val) {
    happySlider.current.value = val;
    setHappy(val);
  }

  function setCalmSlider(val) {
    calmSlider.current.value = val;
    setCalm(val);
  }

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
  function resetFields() {
    setHappy("");
    setCalm("");
    setTriggersList([]);
    setSleep("");
    setNotes("");
    setErrors("");
  }

  return (
    <form>
      <XYInput
        setHappySlider={setHappySlider}
        setCalmSlider={setCalmSlider}
        initialHappy={happy}
        initialCalm={calm}
      />
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
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
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
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          name="notes"
        ></textarea>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          if (props.clearOnSubmit) {
            resetFields();
          }
          props.submit(
            { happy, calm, sleep, triggersList, notes },
            validate,
            setErrors
          );
        }}
      >
        Submit
      </button>
      {props.handleDelete ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            props.handleDelete();
            resetFields();
          }}
        >
          Delete
        </button>
      ) : null}
      {R.isEmpty(errors)
        ? null
        : errors.map((error, i) => <p key={i}>{error}</p>)}
    </form>
  );
}

export default Quiz;
