import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
  border-right: 0.5px solid var(--color-border);
`;
const DropdownButton = styled.button`
  width: 100px;
  height: 30px;
  background-color: var(--color-purple);
  color: var(--color-white);
  margin: 0;
  padding: 3px 0;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: var(--font-size-small);
  box-shadow: 0px 2px 4px 0px rgba(43, 39, 53, 0.15);
`;
const DropdownMenu = styled.ul<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  top: 17px;
  left: 0;
  background-color: var(--color-purple);
  border-radius: 3px;
  list-style: none;
  z-index: 10;
  width: 60px;
`;
const DropdownItem = styled.li`
  cursor: pointer;

  &:hover {
    background-color: #7d32ff;
  }
`;

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("계열 선택하기");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}>{selectedOption}</DropdownButton>
      <DropdownMenu isOpen={isOpen}>
        <DropdownItem onClick={() => handleOptionClick("item1")}>
          item1
        </DropdownItem>
        <DropdownItem onClick={() => handleOptionClick("item2")}>
          item2
        </DropdownItem>
        <DropdownItem onClick={() => handleOptionClick("item3")}>
          item3
        </DropdownItem>
      </DropdownMenu>
    </DropdownContainer>
  );
}
