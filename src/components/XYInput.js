import React, { useEffect, useRef } from "react";
import scaleValue from "../utils/scale-value";

export default function XYInput(props) {
  let canvas = useRef();
  let ctx = useRef();

  useEffect(() => {
    canvas.current = document.getElementById("canvas");
    ctx.current = canvas.current.getContext("2d");

    drawText();

    let mouseIsDown = false;
    let mousePosition;
    canvas.current.addEventListener("mousedown", (e) => {
      mouseIsDown = true;
      mousePosition = getMousePos(canvas, e);

      ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
      drawText();
      placeCircle(mousePosition.x, mousePosition.y);
    });
    canvas.current.addEventListener("mousemove", (e) => {
      if (mouseIsDown === true) {
        mousePosition = getMousePos(canvas, e);
        ctx.current.clearRect(
          0,
          0,
          canvas.current.width,
          canvas.current.height
        );
        drawText();
        placeCircle(mousePosition.x, mousePosition.y);
      }
    });

    document.addEventListener("mouseup", (e) => {
      if (mouseIsDown) {
        mouseIsDown = false;
        props.setHappySlider(
          scaleValue(mousePosition.x, [0, canvas.current.width], [0, 100]),
          "happy"
        );
        props.setCalmSlider(
          scaleValue(mousePosition.y, [0, canvas.current.height], [0, 100]),
          "calm"
        );
      }
    });

    function getMousePos(canvas, evt) {
      var rect = canvas.current.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
      };
    }
  }, []);

  useEffect(() => {
    if (props.initialHappy && props.initialCalm) {
      console.log("start circle placement");
      console.log(props.initialHappy);
      console.log(props.initialCalm);
      const circleX = scaleValue(
        props.initialHappy,
        [0, 100],
        [0, canvas.current.width]
      );
      const circleY = scaleValue(
        props.initialCalm,
        [0, 100],
        [0, canvas.current.height]
      );
      console.log(circleX + ", " + circleY);
      ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
      drawText();
      placeCircle(circleX, circleY);
    }
  }, [props.initialHappy, props.initialCalm]);

  function placeCircle(x, y) {
    ctx.current.beginPath();
    ctx.current.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.current.stroke();
  }

  function drawText() {
    ctx.current.font = "15px Arial";
    ctx.current.fillText("Sad", 15, canvas.current.height - 5);
    ctx.current.fillText(
      "Happy",
      canvas.current.width - 50,
      canvas.current.height - 5
    );

    ctx.current.save();
    ctx.current.translate(12, canvas.current.height - 20);
    ctx.current.rotate(-0.5 * Math.PI);

    ctx.current.fillText("Anxious", 0, 0);
    ctx.current.fillText("Calm", canvas.current.height - 65, 0);
    ctx.current.restore();
  }

  return (
    <canvas
      id="canvas"
      style={{ border: "1px solid black" }}
      height="400"
      width="400"
    ></canvas>
  );
}
