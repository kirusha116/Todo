/* eslint-disable react/prop-types */
import React from "react";
export function Selector({ selectedState, options, onSelectorChange }) {
  return (
    <select
      className={"nav__select"}
      value={selectedState}
      onChange={(e) => {
        onSelectorChange(e.target.value);
      }}
    >
      {options.map(({ state, label }) => {
        return (
          <option key={state} value={state}>
            {label}
          </option>
        );
      })}
    </select>
  );
}
