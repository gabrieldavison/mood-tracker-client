import React from "react";

function TriggersList(props) {
  return (
    <div>
      {props.triggersList.map((trigger, index) => {
        return (
          <span key={index}>
            {trigger}
            <button onClick={(e) => props.removeTrigger(e, trigger)}>X</button>
          </span>
        );
      })}
    </div>
  );
}

export default TriggersList;
