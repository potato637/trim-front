import styled from "styled-components";
import Dropdown from "./dropdown";
import React, { useState } from "react";
import { FaHashtag } from "react-icons/fa6";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;
const SearchContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SearchHashContainer = styled.div`
  margin-left: 15px;
  display: flex;
  flex-grow: 1;
`;
const SelectedHashtags = styled.div`
  padding-left: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;
const Hashtag = styled.div`
  font-size: var(--font-size-small);
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--color-mint-hash);
  padding: 8px 20px;
  min-width: 30px;
  max-width: 200px;
  height: 30px;
  border-radius: 50px;
  color: var(--color-gray);
  font-weight: 400;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  & > p {
    overflow: hidden;
    white-space: nowrap;
  }
`;
const HashInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const HashInput = styled.input`
  width: 200px;
  height: 30px;
  border: 0.5px solid var(--color-input);
  border-radius: 20px;
  padding: 0 var(--font-size-large);
  font-size: var(--font-size-small);
  color: var(--color-gray);
  &:focus {
    outline: none;
    box-shadow: none;
    border: 0.7px solid var(--color-purple);
  }
  &::placeholder {
    color: var(--color-purple);
  }
`;
const HashIcon = styled(FaHashtag)`
  position: absolute;
  font-weight: 400;
  top: 50%;
  transform: translateY(-50%);
  left: var(--font-size-medium);
  font-size: var(--font-size-small);
  color: var(--color-purple);
`;

export default function Searchwithtag() {
  const [hashtags, setHashtags] = useState<String[]>([]);
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value !== "") {
      setValue("");
    }
    if (value.trim() == "" || hashtags.length >= 3) return;
    setHashtags([...hashtags, value]);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleRemoveHashTag = (index: number) => {
    setHashtags((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <Container>
      <SearchContainer>
        <Dropdown />
        <SearchHashContainer>
          <SelectedHashtags>
            {hashtags?.map((item, index) => (
              <Hashtag key={index} onClick={() => handleRemoveHashTag(index)}>
                <p>{`# ${item}`}</p>
              </Hashtag>
            ))}
          </SelectedHashtags>
        </SearchHashContainer>
      </SearchContainer>
      <HashInputContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <HashIcon />
          <HashInput
            value={value}
            placeholder="해시태그 검색"
            onChange={(event) => handleChange(event)}
          />
        </form>
      </HashInputContainer>
    </Container>
  );
}
