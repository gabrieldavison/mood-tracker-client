import React, { useEffect } from "react";
import scaleValue from "../utils/scale-value";
import { composeWith } from "ramda";

export default function XYInput(props) {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = "15px Arial";
    ctx.fillText("Sad", 15, canvas.height - 5);
    ctx.fillText("Happy", canvas.width - 50, canvas.height - 5);

    ctx.save();
    ctx.translate(12, canvas.height - 20);
    ctx.rotate(-0.5 * Math.PI);

    ctx.fillText("Anxious", 0, 0);
    ctx.fillText("Calm", canvas.height - 65, 0);
    ctx.restore();
    ctx.translate(0, 0);
    canvas.addEventListener("mousedown", (e) => {
      // console.log(e.target);
      // e.target.name = "happy";
      // e.target.value = scaleValue(e.clientX, [8, canvas.width], [0, 100]);
      // console.log(e.target);
      // props.handleChange(e);

      // e.target.name = "calm";
      // e.target.value = scaleValue(e.clientY, [20, canvas.height], [100, 0]);
      // console.log(e.target);
      // props.handleChange(e);
      console.log("click");
      props.updateHappy(
        scaleValue(e.clientX, [8, canvas.width], [0, 100]),
        "happy"
      );
      props.updateCalm(
        scaleValue(e.clientY, [20, canvas.height], [100, 0]),
        "calm"
      );

      // console.log(scaleValue(e.clientX, [8, canvas.width], [0, 100]));
      // console.log(scaleValue(e.clientY, [20, canvas.height], [100, 0]));
    });
  }, []);

  return (
    <canvas
      id="canvas"
      style={{ border: "1px solid black" }}
      height="400"
      width="400"
    ></canvas>
  );
}
