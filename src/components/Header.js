import React from "react";
import { css } from "emotion";

export default function Header() {
  return (
    <header>
      <h1
        className={css`
          color: red;
        `}
      >
        Temper
      </h1>
      <p>mood tracker</p>
    </header>
  );
}
