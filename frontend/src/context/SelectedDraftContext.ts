import { createContext } from "react";

interface SelectedDraftContextType {
  selectedDraftId: number | null;
  setSelectedDraftId: (draftId: number | null) => void;
}

export const SelectedDraftContext = createContext<SelectedDraftContextType>({
  selectedDraftId: null,
  setSelectedDraftId: () => {},
});
