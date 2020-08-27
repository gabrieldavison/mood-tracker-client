import React, { useState } from "react";
import TriggersList from "./components/triggersList";
import client from "./feathers";

function Quiz() {
  const [happy, setHappy] = useState("50");
  const [calm, setCalm] = useState("50");
  const [sleep, setSleep] = useState("");
  const [triggerInput, setTriggerInput] = useState("");
  const [triggersList, setTriggersList] = useState([]);
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState();

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

  function submit(e) {
    e.preventDefault();
    console.log(happy, calm, sleep, triggersList, notes);

    const data = { happy, calm, sleep, triggersList };
    client
      .service("log")
      .create(data)
      .catch((error) => setErrorMessage(error.message));
  }

  return (
    <form>
      <div>
        <label htmlFor="happy">Happy</label>
        <input
          id="happy"
          type="range"
          min="0"
          max="100"
          value={happy}
          onChange={(e) => setHappy(e.target.value)}
        />
        <label htmlFor="calm">Calm</label>
        <input
          id="calm"
          type="range"
          min="0"
          max="100"
          value={calm}
          onChange={(e) => setCalm(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="sleep">How many hours did you sleep last night?</label>
        <input
          type="number"
          id="sleep"
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
        <label htmlFor="notes" />
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>
      <button onClick={(e) => submit(e)}>Submit</button>
      <p>{errorMessage === undefined ? null : errorMessage}</p>
    </form>
  );
}

export default Quiz;
