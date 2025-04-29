// type Selector = {
//  options: {value: string; label: string}[]
//  selectedOptionValue?: string
//  onItemSelect: (value: string) => void;

import { useEffect, useState } from "react";

// }
export default function SelectorV2({
  options,
  selectedOptionValue,
  onItemSelect,
}) {
  //   const [selectedValue, setSelectedValue] = useState(selectedOptionValue ?? "");

  // Для того, чтобы обновить состояние, которое пришло сверху
  //   useEffect(() => {
  //     if (selectedOptionValue !== selectedValue) {
  //       setSelectedValue(selectedOptionValue);
  //     }
  //   }, [selectedOptionValue]);

  //   e - ChangeEvent<HTMLSelectElement>
  const handleSelection = (e) => {
    // setSelectedValue(e.target.value);
    onItemSelect(e.target.value);
  };

  return (
    <select
      className={"nav__select"}
      value={selectedOptionValue}
      onChange={handleSelection}
    >
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
