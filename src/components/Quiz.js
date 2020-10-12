import React, { useState, useEffect, useRef } from "react";
import * as R from "ramda";
import TriggersList from "./triggersList";
import validate from "../utils/validate";
import XYInput from "./XYInput";
import { css, cx } from "emotion";

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

  const form = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1em;
  `;

  const formItem = css`
    margin-top: 1em;
  `;

  const formInput = css`
    display: block;
    margin: auto;
    &--withBtn {
      text-align: center;
    }
  `;
  const formInput__withBtn = formInput + "--withBtn";

  return (
    <form className={form}>
      <XYInput
        setHappySlider={setHappySlider}
        setCalmSlider={setCalmSlider}
        initialHappy={happy}
        initialCalm={calm}
      />
      <div className={formItem}>
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
      </div>
      <div className={formItem}>
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
      <div className={formItem}>
        <label htmlFor="sleep">How many hours did you sleep last night?</label>
        <input
          className={formInput}
          type="number"
          name="sleep"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
        />
      </div>
      <div className={formItem}>
        <label htmlFor="triggers">Has anything triggered how you feel?</label>
        <TriggersList
          triggersList={triggersList}
          removeTrigger={removeTrigger}
        />
        <div className={formInput__withBtn}>
          <input
            id="triggers"
            value={triggerInput}
            onChange={(e) => setTriggerInput(e.target.value)}
          />
          <button onClick={(e) => addTrigger(e)}>Add</button>
        </div>
      </div>
      <div
        className={cx(
          formItem,
          css`
            text-align: center;
          `
        )}
      >
        <label htmlFor="notes">Notes</label>
        <textarea
          className={formInput}
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
