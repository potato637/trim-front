import React from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "CHOCOLATE" },
  { value: "chocolate", label: "CHOCOLATE" },
  { value: "chocolate", label: "CHOCOLATE" },
];

export default function Dropdown() {
  return (
    <Select
      placeholder="계열 선택하기"
      isSearchable={false}
      styles={{
        control: (baseStyles, state) => ({
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
          marginTop: "10px",
          transform: "none",
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: "white",
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: "white",
        }),
        dropdownIndicator: (baseStyles, state) => ({
          ...baseStyles,
          color: "var(--color-white)",
          ":hover": { color: "var(--color-white)" },
        }),
      }}
      options={options}
    />
  );
}
