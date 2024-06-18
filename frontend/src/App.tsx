import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DraftEditor } from "./components/drafts/editor/DraftEditor";
import DraftsList from "./components/drafts/sidebar/DraftsList";
import { SelectedDraftContext } from "./context/SelectedDraftContext";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [selectedDraftId, setSelectedDraftId] = useState<number | null>(null);

  return (
    <div className="h-screen min-h-0 flex flex-col items-stretch">
      <div className="flex h-full">
        <QueryClientProvider client={queryClient}>
          <SelectedDraftContext.Provider
            value={{
              selectedDraftId,
              setSelectedDraftId,
            }}
          >
            <DraftsList />
            <DraftEditor />
          </SelectedDraftContext.Provider>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
