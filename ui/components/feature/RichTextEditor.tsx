"use client";
import FileHandler from "@tiptap-pro/extension-file-handler";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Color } from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";
import { useEffect } from "react";
import ImageResize from "tiptap-extension-resize-image";
import { CustomImageExtension } from "./CustomImageExtension";
import { FontSizeExtension } from "./FontSize";
import TextEditorMenuBar from "./TextEditorMenuBar";
type TextEditorProps = {
  onChange: (content: string) => void;
  initialContent?: string;
};
const lowlight = createLowlight(all);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);
export default function RichTextEditor({
  onChange,
  initialContent,
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline.configure({
        HTMLAttributes: {
          class: "underline underline-offset-4",
        },
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
        HTMLAttributes: {
          class: "leading-relaxed mt-4",
        },
      }),
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal pl-4",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc pl-4",
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: "my-1", // Add vertical spacing between items
        },
      }),
      Image.configure({ inline: true, allowBase64: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Paragraph.configure({
        HTMLAttributes: {
          class: "leading-relaxed  text-[16px]",
        },
      }),
      FontSizeExtension,
      CustomImageExtension,
      Link.configure({
        HTMLAttributes: {
          class:
            "text-primary hover:text-primary/80 cursor-pointer hover:underline underline-offset-4 ",
        },
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-[1px]",
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: "border-[1px] px-4 py-2",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border-[1px] px-4 py-2",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "bg-neutral-800 overflow-auto p-4 text-primary my-2",
        },
      }),
      Youtube.configure({
        controls: false,
        nocookie: true,
        HTMLAttributes: {
          class: "mx-auto block max-w-full",
          style: "display: block; margin: 0 auto;",
        },
      }),
      ImageResize.configure({
        allowBase64: true,
      }),
      FileHandler.configure({
        allowedMimeTypes: [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
        ],
        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: "image",
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach((file) => {
            if (htmlContent) {
              // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
              // you could extract the pasted file from this url string and upload it to a server for example

              return false;
            }

            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(currentEditor.state.selection.anchor, {
                  type: "image",
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[150px]  cursor-text rounded-md border p-5 ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ",
      },
    },
    immediatelyRender: false,
    autofocus: "start",
    content: initialContent,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      onChange(content);
    },
  });
  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent, false);
    }
  }, [editor, initialContent]);
  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result;
          if (typeof result === "string") {
            editor?.commands.setImage({
              src: result,
              alt: file.name,
              title: file.name,
            });
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  if (!editor) {
    return null;
  }

  return (
    <div>
      <TextEditorMenuBar editor={editor} addImage={addImage} />
      <EditorContent
        className="prose prose-h1:my-0 prose-p:my-3 prose-a:no-underline prose-hr:my-0 max-w-none"
        editor={editor}
      />
    </div>
  );
}
