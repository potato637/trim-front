import EasyMDE from "easymde";
import React, { useEffect, useRef, useState } from "react";
import "easymde/dist/easymde.min.css";

export default function Mde() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    if (!textareaRef.current) return;

    const easyMDE = new EasyMDE({
      element: textareaRef.current,
      spellChecker: false,
      autosave: { enabled: true, uniqueId: "mde" },
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        "image",
        "|",
        "preview",
        "side-by-side",
        "fullscreen",
        "|",
        "guide",
      ],
    });

    easyMDE.codemirror.on("change", () => {
      setMarkdown(easyMDE.value());
    });

    return () => {
      easyMDE.toTextArea();
    };
  }, []);

  return (
    <React.Fragment>
      <textarea ref={textareaRef} />
      <h3>Markdown Output:</h3>
      <pre>{markdown}</pre>
    </React.Fragment>
  );
}
