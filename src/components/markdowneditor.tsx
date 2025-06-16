import EasyMDE from "easymde";
import { SetStateAction, useEffect, useRef } from "react";

interface MarkdowneditorI {
  value: string;
  onChange: React.Dispatch<SetStateAction<string>>;
}

export default function Markdowneditor({ value, onChange }: MarkdowneditorI) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const easyMDERef = useRef<EasyMDE | null>(null);

  useEffect(() => {
    if (!textareaRef.current) return;

    easyMDERef.current = new EasyMDE({
      element: textareaRef.current,
      initialValue: value,
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
      placeholder: "답변을 달아보세요.",
      status: false,
    });

    easyMDERef.current.codemirror.on("change", () => {
      onChange(easyMDERef.current!.value() || "");
    });

    return () => {
      easyMDERef.current?.toTextArea();
      easyMDERef.current = null;
    };
  }, []);

  useEffect(() => {
    if (easyMDERef.current && value === "") {
      easyMDERef.current.value("");
    }
  }, [value]);

  return (
    <div>
      <textarea ref={textareaRef} />
    </div>
  );
}
