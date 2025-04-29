import { Image } from "@tiptap/extension-image";
import { NodeViewProps, ReactNodeViewRenderer } from "@tiptap/react";
import { ImageNode } from "./ImageNode";

export const CustomImageExtension = Image.extend({
  addAttributes() {
    return {
      uploadImageHandler: {
        default: undefined,
        renderHTML: () => ({}),
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "img[src]",
      },
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(
      ImageNode as React.ComponentType<NodeViewProps>,
    );
  },
});
