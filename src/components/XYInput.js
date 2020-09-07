import React, { useEffect } from "react";
import scaleValue from "../utils/scale-value";
import { composeWith } from "ramda";

export default function XYInput(props) {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    drawText();

    let mouseIsDown = false;
    let mousePosition;
    canvas.addEventListener("mousedown", (e) => {
      mouseIsDown = true;
      mousePosition = getMousePos(canvas, e);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawText();
      placeCircle(mousePosition.x, mousePosition.y);
    });
    canvas.addEventListener("mousemove", (e) => {
      if (mouseIsDown === true) {
        mousePosition = getMousePos(canvas, e);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawText();
        placeCircle(mousePosition.x, mousePosition.y);
      }
    });

    document.addEventListener("mouseup", (e) => {
      if (mouseIsDown) {
        mouseIsDown = false;
        props.setHappySlider(
          scaleValue(mousePosition.x, [0, canvas.width], [0, 100]),
          "happy"
        );
        props.setCalmSlider(
          scaleValue(mousePosition.y, [0, canvas.height], [100, 0]),
          "calm"
        );
      }
    });

    function drawText() {
      ctx.font = "15px Arial";
      ctx.fillText("Sad", 15, canvas.height - 5);
      ctx.fillText("Happy", canvas.width - 50, canvas.height - 5);

      ctx.save();
      ctx.translate(12, canvas.height - 20);
      ctx.rotate(-0.5 * Math.PI);

      ctx.fillText("Anxious", 0, 0);
      ctx.fillText("Calm", canvas.height - 65, 0);
      ctx.restore();
    }

    function placeCircle(x, y) {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.stroke();
    }

    function getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
      };
    }
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
