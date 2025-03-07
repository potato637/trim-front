import React from "react";
import Select, { SingleValue } from "react-select";

const options = [
  { value: "Law College", label: "인문사회계열" },
  { value: "science", label: "자연과학계열" },
  { value: "engineering", label: "공학계열" },
  { value: "arts", label: "예체능계열" },
  { value: "medicine", label: "의학계열" },
  { value: "agriculture", label: "농수산계열" },
  { value: "lifeScience", label: "생활과학계열" },
];

interface DropdownI {
  setMajorType: (majorType: string) => void;
}

export default function Dropdown({ setMajorType }: DropdownI) {
  const handleChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    if (selectedOption) {
      setMajorType(selectedOption.value);
    }
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
    />
  );
}
