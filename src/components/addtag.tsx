import styled from "styled-components";
import Dropdown from "./dropdown";
import React, { useState } from "react";
import { FaHashtag } from "react-icons/fa6";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const SearchContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SearchHashContainer = styled.div`
  margin-left: 20px;
  display: flex;
  flex-grow: 1;
`;
const SelectedHashtags = styled.div`
  padding-left: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
`;
const Hashtag = styled.div`
  font-size: var(--font-size-small);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--color-mint-hash);
  padding: 5px 15px;
  min-width: 30px;
  max-width: 100px;
  height: 30px;
  border-radius: 50px;
  color: var(--color-gray);
  overflow: hidden;
  white-space: nowrap;
  font-weight: 500;
  cursor: pointer;
`;
const HashInputContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > form {
    position: absolute;
  }
`;
const HashInput = styled.input`
  width: 200px;
  height: 30px;
  border: 0.5px solid var(--color-input);
  border-radius: 20px;
  padding: 0 1.5rem;
  font-size: var(--font-size-small);
  color: var(--color-purple);
  &:focus {
    outline: none;
    box-shadow: none;
    border: 0.7px solid var(--color-purple);
  }
  &::placeholder {
    font-size: var(--font-size-small);
    color: var(--color-purple);
  }
`;
const HashIcon = styled(FaHashtag)`
  position: absolute;
  font-weight: 400;
  top: 50%;
  transform: translateY(-50%);
  left: 0.5rem;
  font-size: var(--font-size-small);
  color: var(--color-purple);
`;

export default function Addtag() {
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
              <Hashtag
                key={index}
                onClick={() => handleRemoveHashTag(index)}
              >{`# ${item}`}</Hashtag>
            ))}
          </SelectedHashtags>
        </SearchHashContainer>
        <HashInputContainer>
          <form onSubmit={(event) => handleSubmit(event)}>
            <HashIcon />
            <HashInput
              value={value}
              placeholder="해시태그 추가"
              onChange={(event) => handleChange(event)}
            />
          </form>
        </HashInputContainer>
      </SearchContainer>
    </Container>
  );
}
