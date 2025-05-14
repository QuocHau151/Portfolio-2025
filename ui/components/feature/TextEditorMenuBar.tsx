import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Level } from "@tiptap/extension-heading";
import { Editor } from "@tiptap/react";
import { Highlighter, YoutubeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";
import { BsTypeUnderline } from "react-icons/bs";
import {
  FiAlignCenter,
  FiAlignJustify,
  FiAlignLeft,
  FiAlignRight,
  FiImage,
  FiLink,
} from "react-icons/fi";
import { IoListOutline } from "react-icons/io5";
import {
  RiBold,
  RiCodeSSlashLine,
  RiItalic,
  RiListOrdered2,
} from "react-icons/ri";

const ButtonMenu = ({
  onClick,
  isActive,
  disabled,
  children,
}: {
  onClick: () => void;
  isActive: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <div
    role="button"
    tabIndex={disabled ? -1 : 0}
    onClick={(e) => {
      e.stopPropagation();
      if (!disabled) {
        onClick();
      }
    }}
    aria-disabled={disabled}
    className={`inline-flex items-center justify-center p-2 select-none ${
      isActive ? "rounded-xl bg-violet-500 text-white hover:bg-violet-600" : ""
    } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
  >
    {children}
  </div>
);
export default function TextEditorMenuBar({
  editor,
  addImage,
}: {
  editor: Editor | null;
  addImage: () => void;
}) {
  // Add link handling functions
  const setLink = () => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return; // Cancelled
    }

    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // Update url validation
    if (!/^https?:\/\//i.test(url)) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: `http://${url}` })
        .run();
    } else {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const [headingLevel, setHeadingLevel] = useState<number>(1);
  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";
  const [inputValue, setInputValue] = useState(currentFontSize);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0 && editor) {
      try {
        editor.chain().focus().setFontSize(`${size}px`).run();
        setInputValue(newSize);
      } catch (error) {
        console.error("Error updating font size:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(currentFontSize);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
    }
  };
  const colorValue = editor?.getAttributes("textStyle")?.color || "#000000";

  const onChangeHighlight = () => {
    editor?.chain().focus().setHighlight({ color: colorValue }).run();
  };
  useEffect(() => {
    setInputValue(currentFontSize);
  }, [currentFontSize]);
  useEffect(() => {
    if (!editor) return;

    const handleSelectionUpdate = () => {
      const heading = editor.getAttributes("heading");
      const fontSize = editor.getAttributes("textStyle").fontSize;

      if (editor.isActive("heading")) {
        setHeadingLevel(heading.level);
        // Chỉ cập nhật inputValue nếu không có fontSize được set
        if (!fontSize) {
          const headingFontSizes: { [key: number]: string } = {
            1: "24",
            2: "22",
            3: "20",
            4: "18",
            5: "16",
            6: "14",
          };
          const newSize = headingFontSizes[heading.level] || "16";
          setInputValue(newSize);
        } else {
          setInputValue(fontSize.replace("px", ""));
        }
      } else if (fontSize) {
        setInputValue(fontSize.replace("px", ""));
      }
    };
    editor.on("selectionUpdate", handleSelectionUpdate);
    editor.on("focus", handleSelectionUpdate);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
      editor.off("focus", handleSelectionUpdate);
    };
  }, [editor]);

  if (!editor) return null;

  const buttons = [
    {
      icon: (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <div className="px-2">
              {editor.isActive("heading") ? `H${headingLevel}` : "H1"}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-[9999] rounded-lg p-2">
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <DropdownMenuItem
                className="border-[1px] border-gray-200 bg-white px-8 py-1.5 text-black"
                key={level}
                onClick={() => {
                  const headingFontSizes: { [key: number]: string } = {
                    1: "32",
                    2: "28",
                    3: "24",
                    4: "20",
                    5: "18",
                    6: "16",
                  };

                  if (editor.isActive("heading", { level })) {
                    editor
                      .chain()
                      .focus()
                      .toggleHeading({ level: level as Level })
                      .run();
                  } else {
                    editor
                      .chain()
                      .focus()
                      .setHeading({ level: level as Level })
                      .setFontSize(`${headingFontSizes[level]}px`)
                      .run();
                  }
                  setHeadingLevel(level);
                  setInputValue(headingFontSizes[level]);
                }}
              >
                {`H${level}`}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      isActive: editor.isActive("heading"),
    },
    {
      icon: <RiBold className="size-5" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: <BsTypeUnderline className="size-5" />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
    },
    {
      icon: <RiItalic className="size-5" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
    },
    {
      icon: (
        <div
          className="flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <span
            className="cursor-pointer px-2 py-1 font-bold"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const newSize = parseInt(currentFontSize) - 1;
              if (newSize > 0) updateFontSize(newSize.toString());
            }}
          >
            -
          </span>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={(e) => {
              e.preventDefault();
              handleInputBlur();
            }}
            onKeyDown={handleKeyDown}
            className="w-8 text-center text-black"
          />
          <span
            className="cursor-pointer px-2 py-1 font-bold"
            onClick={(e) => {
              e.stopPropagation();
              const newSize = parseInt(currentFontSize) + 1;
              if (newSize > 0) updateFontSize(newSize.toString());
            }}
          >
            +
          </span>
        </div>
      ),
      onClick: () => {}, // Required for button interface
    },
    {
      icon: (
        <div
          onClick={(e) => e.stopPropagation()}
          className="group relative flex flex-col items-center"
        >
          <div className="flex items-center gap-1">
            <span className="mr-1 text-sm">A</span>
            <div
              className="relative h-5 w-5 rounded-md border border-gray-300 shadow-sm"
              style={{
                backgroundColor:
                  editor.getAttributes("textStyle")?.color || colorValue,
              }}
            >
              <input
                type="color"
                onChange={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  editor
                    .chain()
                    .focus()
                    .setColor((event.target as HTMLInputElement).value)
                    .run();
                }}
                value={editor.getAttributes("textStyle")?.color || colorValue}
                data-testid="setColor"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: (
        <div
          onClick={(e) => e.stopPropagation()}
          className="group relative flex flex-col items-center"
        >
          <div className="flex items-center gap-1">
            <Highlighter size={15} className="mr-1" />
            <div
              className="relative h-5 w-5 rounded-md border border-gray-300 shadow-sm"
              style={{
                backgroundColor:
                  editor.getAttributes("highLight")?.color || "#FFFF00",
              }}
            >
              <input
                type="color"
                onChange={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  editor
                    .chain()
                    .focus()
                    .setHighlight({
                      color: (event.target as HTMLInputElement).value,
                    })
                    .run();
                }}
                value={editor.getAttributes("highLight")?.color || colorValue}
                data-testid="setHighlightColor"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>
          </div>
        </div>
      ),
      onClick: () => {}, // Required for button interface
    },
    {
      icon: <RiCodeSSlashLine className="size-5" />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive("codeBlock"),
      disabled: !editor.can().chain().focus().toggleCode().run(),
    },
    {
      icon: <IoListOutline className="size-5" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <RiListOrdered2 className="size-5" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      disabled: !editor.can().chain().focus().toggleOrderedList().run(),
    },
    {
      icon: <AiOutlineUndo className="size-5" />,
      onClick: () => editor.chain().focus().undo().run(),
      isActive: editor.isActive("undo"),
      disabled: !editor.can().chain().focus().undo().run(),
    },
    {
      icon: <AiOutlineRedo className="size-5" />,
      onClick: () => editor.chain().focus().redo().run(),
      isActive: editor.isActive("redo"),
      disabled: !editor.can().chain().focus().redo().run(),
    },
    {
      icon: <FiAlignLeft className="size-5" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <FiAlignCenter className="size-5" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <FiAlignRight className="size-5" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <FiAlignJustify className="size-5" />,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      isActive: editor.isActive({ textAlign: "justify" }),
    },
    {
      icon: editor.isActive("link") ? (
        <FiLink className="size-5" />
      ) : (
        <FiLink className="size-5" />
      ),
      onClick: () => {
        if (editor.isActive("link")) {
          editor.chain().focus().unsetLink().run();
        } else {
          setLink();
        }
      },
      isActive: editor.isActive("link"),
    },
    {
      icon: <FiImage className="size-5" />,
      onClick: addImage,
      isActive: false,
    },
    {
      icon: <YoutubeIcon className="size-5" />,
      onClick: () => {
        const url = window.prompt("YouTube URL", "");
        if (url === null) return;
        if (url) {
          const width = window.prompt("Width (in pixels)", "640");
          const height = window.prompt("Height (in pixels)", "360");
          editor.commands.setYoutubeVideo({
            src: url,
            width: Math.max(320, parseInt(width || "640", 10)),
            height: Math.max(180, parseInt(height || "360", 10)),
          });
        }
      },
      isActive: false,
    },
  ];

  return (
    <>
      <div className="mb-2 flex flex-wrap space-x-2">
        {buttons.map(({ icon, onClick, isActive, disabled }, index) => (
          <ButtonMenu
            key={index}
            onClick={() => onClick?.()}
            isActive={!!isActive}
            disabled={disabled}
          >
            {icon}
          </ButtonMenu>
        ))}
      </div>
      {/* {editor && (
        <BubbleMenu
          className="relative flex w-full flex-wrap gap-2 rounded-md border border-gray-200 bg-black shadow-sm"
          tippyOptions={{
            duration: 100,
            interactive: true, // Cho phép tương tác với các phần tử trong BubbleMenu
            hideOnClick: false, // Không ẩn khi click vào các phần tử
          }}
          editor={editor}
        >
          {buttons.map(({ icon, onClick, isActive, disabled }, index) => (
            <ButtonMenu
              key={index}
              onClick={() => onClick?.() ?? undefined}
              isActive={!!isActive}
              disabled={disabled}
            >
              {icon}
            </ButtonMenu>
          ))}
        </BubbleMenu>
      )} */}
    </>
  );
}
