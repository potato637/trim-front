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
  border-left: 0.5px solid var(--color-border);
  padding-left: 10px;
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
const Hashtag = styled.button`
  font-size: var(--font-size-small);
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--color-mint-hash);
  padding: 8px 20px;
  min-width: 30px;
  max-width: 200px;
  height: 38px;
  border-radius: 50px;
  border: none;
  color: var(--color-gray);
  font-weight: 400;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
`;
const HashInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const HashInput = styled.input`
  width: 200px;
  height: 38px;
  border: 0.5px solid var(--color-input);
  border-radius: 20px;
  padding: 0 var(--font-size-large);
  font-size: var(--font-size-small);
  color: var(--color-purple);
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
const Search = styled.div`
  font-size: var(--font-size-small);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  color: var(--color-white);
  width: 130px;
  height: 38px;
  border-radius: 20px;
  background-color: var(--color-purple-hover);
  cursor: pointer;
`;

interface Option {
  value: string;
  label: string;
}
interface SearchwithtagI {
  majorType: string;
  setMajorType: (majorType: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  handleTagSearch?: () => void;
  options: Option[];
}

export default function Searchwithtag({
  majorType,
  setMajorType,
  tags,
  setTags,
  handleTagSearch,
  options,
}: SearchwithtagI) {
  const [value, setValue] = useState<string>("");

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
        <Dropdown
          majorType={majorType}
          setMajorType={setMajorType}
          options={options}
        />
        <SearchHashContainer>
          <SelectedHashtags>
            {tags?.map((item, index) => (
              <Hashtag key={index} onClick={() => handleRemoveHashTag(index)}>
                {`# ${item}`}
              </Hashtag>
            ))}
          </SelectedHashtags>
        </SearchHashContainer>
      </SearchContainer>
      <Search onClick={() => handleTagSearch && handleTagSearch()}>
        검색하기
      </Search>
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
    </Container>
  );
}
