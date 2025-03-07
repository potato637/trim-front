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
  padding-left: 15px;
  border-left: 0.5px solid var(--color-border);
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
  height: 38px;
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
  height: 38px;
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

interface AddtagI {
  setMajorType: (majorType: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
}

export default function Addtag({ setMajorType, tags, setTags }: AddtagI) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.trim() == "" || tags.length >= 3) {
      setValue("");
      return;
    }
    setTags([...tags, value.trim()]);
    setValue("");
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleRemoveHashTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };
  return (
    <Container>
      <SearchContainer>
        <Dropdown setMajorType={setMajorType} />
        <SearchHashContainer>
          <SelectedHashtags>
            {tags?.map((item, index) => (
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
