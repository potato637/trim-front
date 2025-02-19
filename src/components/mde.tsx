import EasyMDE from "easymde";
import React, { useEffect, useRef, useState } from "react";
import "easymde/dist/easymde.min.css";
import styled from "styled-components";

const StyledEasyMDE = styled.div`
  font-size: 0.6rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  .editor-container {
    display: flex;
    width: 100%;
    overflow: hidden;
  }
  .editor-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: white;
    padding: 10px;
  }
  .editor-toolbar {
    display: flex;
    padding: 0;
    width: 100%;
    height: 20px;
    align-items: center;
    border: none;
    border-radius: 0px;
    border-top: 0.5px solid #ccc;
    z-index: 100;
  }
  .editor-toolbar button {
    font-size: 0.5rem;
    font-weight: 500;
    min-width: 15px;
    height: 20px;
    padding: 0px;
    margin: 0px;
    color: #a3a1a1;
  }
  .editor-toolbar button.active,
  .editor-toolbar button:hover {
    background: none;
    border: none;
    color: #000;
  }
  .CodeMirror {
    padding: 0;
    border: none;
    border-radius: 0px;
    border-bottom: 0.5px solid #ccc;
    line-height: 1rem;
  }
  .CodeMirror pre {
    padding: 0;
    margin: 0;
  }

  /* full-screen */
  .EasyMDEContainer .CodeMirror-scroll {
  }
  .editor-toolbar.fullscreen {
    margin-top: 30px;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.input`
  flex: 9;
  font-weight: 600;
  padding: 10px 0px;
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
  gap: 10px;
  & > button {
    cursor: pointer;
    font-size: 0.45rem;
    min-width: 40px;
    border-radius: 10px;
    border: none;
    padding: 3px;
  }
  & > button:first-child {
    color: #37009c;
    background-color: #fbfbfb;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  }
  & > button:last-child {
    color: #fff;
    background-color: #6129e9;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  }
`;
const Save = styled.button``;
const Submit = styled.button``;

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
        "|",
        "side-by-side",
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
          <Save type="button" onClick={handleSave}>
            임시저장
          </Save>
          <Submit type="button" onClick={handleSubmit}>
            제출하기
          </Submit>
        </Buttons>
      </TitleContainer>
      <textarea ref={textareaRef} />
    </StyledEasyMDE>
  );
}
