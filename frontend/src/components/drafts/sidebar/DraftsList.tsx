import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { SelectedDraftContext } from "../../../context/SelectedDraftContext";
import { Draft } from "../../../types";
import fetchJSON from "../../../utils/fetchJSON";
import { VStack } from "../../ui/layout";
import DraftCard from "./DraftCard";
import NewDraftCard from "./NewDraftCard";

export default function DraftsList() {
  const { data: drafts } = useQuery({
    queryKey: ["drafts"],
    queryFn: async () => fetchJSON<Draft[]>("http://localhost:8000/drafts/"),
  });

  const { selectedDraftId, setSelectedDraftId } =
    useContext(SelectedDraftContext);

  const queryClient = useQueryClient();

  const handleDraftClick = (draftId: number) => {
    setSelectedDraftId(draftId);
  };

  const handleDeleteDraftClick = async (draftId: number) => {
    const res = await fetch(`http://localhost:8000/drafts/${draftId}/`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete your draft");
      return;
    }

    setSelectedDraftId(null);

    queryClient.invalidateQueries({
      queryKey: ["drafts"],
    });
  };

  return (
    <div className="grid grid-cols-[250px_1fr] items-stretch content-stretch justify-stretch h-full">
      <VStack className="border-r gap-0 overflow-scroll min-h-0 h-full" noWrap>
        <NewDraftCard />
        {drafts?.map((draft) => {
          return (
            <DraftCard
              key={draft.id}
              previewText={draft.preview}
              isSelected={draft.id === selectedDraftId}
              onClick={() => handleDraftClick(draft.id)}
              onDeleteClick={() => handleDeleteDraftClick(draft.id)}
            />
          );
        })}
        <div className="min-h-10" />
      </VStack>
    </div>
  );
}
