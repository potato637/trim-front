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

interface MdePropsI {
  setMarkdown: (markdown: string) => void;
  clearMDE: boolean;
}

export default function Mde({ setMarkdown, clearMDE }: MdePropsI) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const easyMDERef = useRef<EasyMDE | null>(null);

  useEffect(() => {
    if (!textareaRef.current) return;

    easyMDERef.current = new EasyMDE({
      element: textareaRef.current,
      spellChecker: false,
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

    easyMDERef.current.codemirror.on("change", () => {
      setMarkdown(easyMDERef.current?.value() || "");
    });

    return () => {
      easyMDERef.current?.toTextArea();
      easyMDERef.current = null;
    };
  }, []);

  useEffect(() => {
    if (easyMDERef.current) {
      easyMDERef.current.value("");
    }
  }, [clearMDE]);

  return (
    <StyledEasyMDE>
      <textarea ref={textareaRef} />
    </StyledEasyMDE>
  );
}
