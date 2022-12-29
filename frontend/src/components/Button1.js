import React from "react";
import "./Styles/Button.css";

const STYLES = [
  "btn--primary--nav",
  "btn--outline--nav",
  "btn--primary--scr",
  "btn--outline--scr",
  "btn--primary--logsign",
];
const SIZES = ["btn--medium", "btn--large"];
const TRANS = ["btn--nav", "btn--scr", "btn--logsign"];

export const Button1 = ({
  className,
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  buttonTrans,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  const checkButtonTrans = TRANS.includes(buttonTrans) ? buttonTrans : TRANS[0];

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonTrans} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
