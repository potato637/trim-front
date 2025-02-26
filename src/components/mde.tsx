import EasyMDE from "easymde";
import React, { useEffect, useRef, useState } from "react";
import "easymde/dist/easymde.min.css";
import styled from "styled-components";

const StyledEasyMDE = styled.div`
  font-size: var(--font-size-medium);
  width: 100%;
  display: flex;
  flex-direction: column;

  .editor-container {
    display: flex;
    width: 100%;
    overflow: hidden;
  }

  .editor-toolbar {
    display: flex;
    gap: 5px;
    padding: 0;
    width: 100%;
    height: 50px;
    align-items: center;
    border: none;
    border-radius: 0px;
    border-top: 0.5px solid var(--color-border);
    z-index: 100;
  }

  .editor-toolbar button {
    font-size: var(--font-size-small);
    font-weight: 500;
    width: 20px;
    height: 20px;
    padding: 0px;
    margin: 0px;
    color: var(--color-mde-toolbar);
  }

  .editor-toolbar button.active,
  .editor-toolbar button:hover {
    background: none;
    border: none;
    color: var(--color-black);
  }

  .CodeMirror {
    padding: 0;
    border: none;
    border-radius: 0px;
    border-bottom: 0.5px solid var(--color-border);
    line-height: 1.5rem;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.input`
  flex: 9;
  font-size: var(--font-size-large);
  font-weight: 600;
  padding: 10px 0px 20px 0px;
  border: none;
  &:hover,
  &:active,
  &:focus {
    outline: none;
    border: none;
  }
`;
const Buttons = styled.div`
  flex: 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 100px;
    font-size: var(--font-size-small);
    border-radius: 50px;
    border: none;
    padding: 8px 0;
  }
  & > button:first-child {
    color: var(--color-purple);
    background-color: var(--color-white-gray);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  }
  & > button:last-child {
    color: var(--color-white-gray);
    background-color: var(--color-purple);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  }
`;

export default function Mde() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const onTitleChange = (text: string) => {
    setTitle(text);
  };
  const handleSave = () => {
    return null;
  };
  const handleSubmit = () => {
    // markdown 보내기
    return null;
  };

  useEffect(() => {
    if (!textareaRef.current) return;

    const easyMDE = new EasyMDE({
      element: textareaRef.current,
      spellChecker: false,
      autosave: { enabled: true, uniqueId: "mde" },
      toolbar: [
        "heading-1",
        "heading-2",
        "heading-3",
        "|",
        "bold",
        "italic",
        "strikethrough",
        "|",
        "image",
        "link",
        "code",
      ],
      placeholder: "내용을 입력해주세요!",
      status: false,
      previewClass: "editor-preview",
    });

    easyMDE.codemirror.on("change", () => {
      setMarkdown(easyMDE.value());
    });

    return () => {
      easyMDE.toTextArea();
    };
  }, []);

  return (
    <StyledEasyMDE>
      <TitleContainer>
        <Title
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="제목을 입력해주세요"
        />
        <Buttons>
          <button type="button" onClick={handleSave}>
            임시저장
          </button>
          <button type="button" onClick={handleSubmit}>
            제출하기
          </button>
        </Buttons>
      </TitleContainer>
      <textarea ref={textareaRef} />
    </StyledEasyMDE>
  );
}
