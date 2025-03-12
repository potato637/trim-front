import React, { useState } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";

interface Option {
  value: string;
  label: string;
}
interface DropdownI {
  majorType?: string;
  setMajorType: (majorType: string) => void;
  options: Option[];
}

export default function Dropdown({
  majorType,
  setMajorType,
  options,
}: DropdownI) {
  const handleChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    setMajorType(selectedOption?.value || "");
  };

  return (
    <Select
      placeholder="계열 선택하기"
      isSearchable={false}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "var(--color-purple)",
          width: "150px",
          height: "30px",
          borderRadius: "20px",
          fontSize: "var(--font-size-small)",
          color: "var(--color-white)",
          boxShadow: "none",
          border: "none",
          padding: "0px 5px",
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          color: "var(--color-gray)",
          fontSize: "var(--font-size-small)",
          padding: "5px 0",
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: "white",
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: "white",
        }),
        dropdownIndicator: (baseStyles) => ({
          ...baseStyles,
          color: "var(--color-white)",
          ":hover": { color: "var(--color-white)" },
        }),
        option: (baseStyles, { isFocused, isSelected }) => ({
          ...baseStyles,
          backgroundColor: isFocused
            ? "rgba(129, 140, 248, 0.2)"
            : "var(--color-white)",
          color: isSelected ? "var(--color-purple)" : "var(--color-gray)",
          ":active": {
            backgroundColor: "rgba(129, 140, 248, 0.2)",
          },
        }),
      }}
      options={options}
      onChange={handleChange}
      value={options.find((option) => option.value === majorType)}
    />
  );
}
