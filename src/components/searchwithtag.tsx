import styled from "styled-components";
import Dropdown from "./dropdown";
import React, { useState } from "react";
import { FaHashtag } from "react-icons/fa6";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SearchContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SearchHashContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;
const SelectedHashtags = styled.div`
  padding-left: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
`;
const Hashtag = styled.div`
  font-size: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f3ff;
  padding: 5px;
  min-width: 30px;
  max-width: 100px;
  max-height: 17px;
  border-radius: 45px;
  color: #2e40bb;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  cursor: pointer;
`;
const HashInputContainer = styled.div`
  width: 100%;
  max-width: 160px;
  position: relative;
  display: flex;
  align-items: center;
`;
const HashForm = styled.form`
  margin: 0;
  padding: 0;
  width: 160px;
`;
const HashInput = styled.input`
  width: calc(100% - 2rem);
  height: 16px;
  border: 0.5px solid #ceb2ff;
  border-radius: 10px;
  padding: 0 1rem;
  font-size: 0.5rem;
  color: #8045fa;
  &:focus {
    outline: none;
    box-shadow: none;
    border: 0.7px solid #ceb2ff;
  }
  &::placeholder {
    font-size: 0.5rem;
    color: #8045fa;
  }
`;
const HashIcon = styled(FaHashtag)`
  position: absolute;
  font-weight: 400;
  top: 50%;
  transform: translateY(-50%);
  left: 0.5rem;
  font-size: 0.5rem;
  color: #8045fa;
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
              <Hashtag
                key={index}
                onClick={() => handleRemoveHashTag(index)}
              >{`# ${item}`}</Hashtag>
            ))}
          </SelectedHashtags>
        </SearchHashContainer>
        <HashInputContainer>
          <HashForm onSubmit={(event) => handleSubmit(event)}>
            <HashIcon />
            <HashInput
              value={value}
              placeholder="해시태그 검색"
              onChange={(event) => handleChange(event)}
            />
          </HashForm>
        </HashInputContainer>
      </SearchContainer>
    </Container>
  );
}
