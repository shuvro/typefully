import { PlusIcon } from "@radix-ui/react-icons";
import { P2 } from "../../ui/typography";
import { DraftCardWrapper } from "./DraftCard";
import { useCallback, useContext } from "react";
import { SelectedDraftContext } from "../../../context/SelectedDraftContext";
import { useQueryClient } from "@tanstack/react-query";

const NewDraftCard = () => {
  const { setSelectedDraftId } = useContext(SelectedDraftContext);

  const queryClient = useQueryClient();

  const handleClick = useCallback(async () => {
    const res = await fetch("http://localhost:8000/drafts/", {
      method: "POST",
    });

    if (!res.ok) {
      alert("Error while creating your draft");
      return;
    }

    const newDraft = await res.json();
    setSelectedDraftId(newDraft.id);

    queryClient.invalidateQueries({ queryKey: ["drafts"] });
  }, [queryClient, setSelectedDraftId]);

  return (
    <DraftCardWrapper onClick={handleClick}>
      <PlusIcon className="text-current" />
      <P2 className="text-current">New draft</P2>
    </DraftCardWrapper>
  );
};

export default NewDraftCard;
