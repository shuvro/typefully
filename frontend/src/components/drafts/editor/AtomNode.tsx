import {MinusIcon, MixerHorizontalIcon, PlusIcon} from "@radix-ui/react-icons";
import {Node} from "@tiptap/core";
import {
  NodeViewContent,
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import {useCallback, useContext} from "react";
import cn from "../../../utils/cn";
import {Button} from "../../ui/button";
import {SelectedDraftContext} from "../../../context/SelectedDraftContext.ts";
import {Draft} from "../../../types.ts";

export const AtomNode = Node.create({
  name: "atom",
  group: "block",
  content: "paragraph+",
  inline: false,
  draggable: true,
  parseHTML() {
    return [{tag: "atom"}];
  },
  renderHTML({HTMLAttributes}) {
    return ["atom", HTMLAttributes, 0];
  },
  addNodeView() {
    return ReactNodeViewRenderer(NodeView);
  },
});

const NodeView = (nodeViewProps: NodeViewProps) => {
  const {editor, node, getPos, deleteNode} = nodeViewProps;
  const {selectedDraftId} = useContext(SelectedDraftContext);

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

  const handleSplitText = useCallback(async () => {
    const res = await fetch("http://localhost:8000/drafts/split-text/", {
      method: "POST",
      body: JSON.stringify({
        draft_id: selectedDraftId,
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });

    const updatedDraft = await res.json().then((data) => {
      return data.draft as Draft;
    });

    // Check if tweets array is empty
    if (!updatedDraft.tweets || updatedDraft.tweets.length === 0) {
      console.log('No tweets to process');
      return; // Return early from the function
    }
    deleteNode(); // Delete the current node

    updatedDraft.tweets.forEach((tweet) => {
      editor
        .chain()
        .insertContentAt(getPos(), {
          type: "atom",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: tweet,
                },
              ],
            },
          ],
        })
        .run();
    });
  }, [deleteNode, editor, getPos, selectedDraftId]);

  return (
    <NodeViewWrapper>
      <NodeViewContent/>
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
          icon={<PlusIcon/>}
          tabIndex={-1}
        />
        <Button
          size="small"
          className="mt-2 ml-3"
          variant="secondary"
          onClick={handleRemoteAtom}
          tabIndex={-1}
          icon={<MinusIcon/>}
        />
        <div className="h-[1px] bg-slate-200 w-full mt-2 mb-3"/>
      </div>
      {charCount > 280 &&
        <div className="flex flex-row max-w-full items-center flex-wrap justify-center gap-3">
          <Button
            size="small"
            className="font-medium text-xs mt-1"
            variant="secondary"
            onClick={handleSplitText}
            icon={<MixerHorizontalIcon/>}
            tabIndex={-1}
            children={"Split Automatically"}
          />
        </div>
      }
    </NodeViewWrapper>
  );
};
