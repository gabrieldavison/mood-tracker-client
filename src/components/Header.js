import React from "react";
import { css } from "emotion";
import { colors } from "../utils/colors";
export default function Header() {
  return (
    <header
      className={css`
        border-bottom: 8px solid ${colors.dark};
      `}
    >
      <h1
        className={css`
          color: ${colors.dark};
          margin-bottom: 0.1em;
          font-size: 5em;
        `}
      >
        Temper
      </h1>
    </header>
  );
}
