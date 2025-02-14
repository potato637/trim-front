import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 5px;
  border-right: 0.6px solid #d9d9d9;
`;
const DropdownButton = styled.button`
  width: 60px;
  height: 16px;
  background-color: #7d32ff;
  color: white;
  margin: 0;
  padding: 3px 0;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 0.5rem;
`;
const DropdownMenu = styled.ul<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  top: 17px;
  left: 0;
  background-color: #7f37fb;
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
