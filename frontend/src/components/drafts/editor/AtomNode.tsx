import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Node } from "@tiptap/core";
import {
  NodeViewContent,
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { useCallback } from "react";
import cn from "../../../utils/cn";
import { Button } from "../../ui/button";

export const AtomNode = Node.create({
  name: "atom",
  group: "block",
  content: "paragraph+",
  inline: false,
  draggable: true,
  parseHTML() {
    return [{ tag: "atom" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["atom", HTMLAttributes, 0];
  },
  addNodeView() {
    return ReactNodeViewRenderer(NodeView);
  },
});

const NodeView = (nodeViewProps: NodeViewProps) => {
  const { editor, node, getPos, deleteNode } = nodeViewProps;

  const charCount = editor.state.doc.textBetween(
    getPos(),
    getPos() + node.nodeSize
  ).length;

  const handleAddAtom = useCallback(() => {
    const newNodePos = getPos() + node.nodeSize;

    editor
      .chain()
      .insertContentAt(newNodePos, {
        type: "atom",
        content: [
          {
            type: "paragraph",
          },
        ],
      })
      .focus()
      .setTextSelection(newNodePos + 2)
      .run();
  }, [editor, getPos, node.nodeSize]);

  const handleRemoteAtom = useCallback(() => {
    deleteNode();
    editor.commands.focus();
  }, [deleteNode, editor.commands]);

  return (
    <NodeViewWrapper>
      <NodeViewContent />
      {/* this wrapping div prevents selection of children on cmd+a */}
      <div contentEditable={false} className="[&>*]:select-none">
        <span
          className={cn(
            "font-mono mt-2",
            charCount > 280 ? "text-red-500" : "text-gray-400"
          )}
        >
          {charCount}/280
        </span>
        <Button
          size="small"
          className="mt-2 ml-3"
          variant="secondary"
          onClick={handleAddAtom}
          icon={<PlusIcon />}
          tabIndex={-1}
        />
        <Button
          size="small"
          className="mt-2 ml-3"
          variant="secondary"
          onClick={handleRemoteAtom}
          tabIndex={-1}
          icon={<MinusIcon />}
        />
        <div className="h-[1px] bg-slate-200 w-full mt-2 mb-10" />
      </div>
    </NodeViewWrapper>
  );
};
