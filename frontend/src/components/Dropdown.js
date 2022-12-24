import React from "react";
import "./Styles/Dropdown.css";
import { useState } from "react";

function Dropdown({ selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);
  const options = ["Teacher", "Student"];

  return (
    <div className="dropdown">
      <span className="birth-edit">role</span>
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
        {selected}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
