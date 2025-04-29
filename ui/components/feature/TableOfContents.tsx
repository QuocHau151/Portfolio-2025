import { Editor } from "@tiptap/react";
import { useCallback, useEffect, useState } from "react";

interface TableOfContentsProps {
  editor: Editor;
}

interface HeadingItem {
  level: number;
  text: string;
  id: string;
}

export function TableOfContent({ editor }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  const generateId = (text: string) => {
    return text.toLowerCase().replace(/\W/g, "-");
  };

  const updateHeadings = useCallback(() => {
    const items: HeadingItem[] = [];
    editor.state.doc.descendants((node) => {
      if (node.type.name === "heading") {
        items.push({
          level: node.attrs.level,
          text: node.textContent,
          id: generateId(node.textContent),
        });
      }
    });
    setHeadings(items);
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    editor.on("update", updateHeadings);
    return () => {
      editor.off("update", updateHeadings);
    };
  }, [editor, updateHeadings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="toc">
      <h3 className="mb-4 text-lg font-bold">Table of Contents</h3>
      <div>
        {headings.map((heading, index) => (
          <div
            key={index}
            className="cursor-pointer hover:text-violet-500"
            style={{ marginLeft: `${(heading.level - 1) * 1.5}rem` }}
            onClick={() => handleClick(heading.id)}
          >
            {heading.text}
          </div>
        ))}
      </div>
    </div>
  );
}
