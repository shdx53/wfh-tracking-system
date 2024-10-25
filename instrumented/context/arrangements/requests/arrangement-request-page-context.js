// Library
import { createContext, useContext } from "react";

const ArrangementRequestPageContext = createContext();

export function ArrangementRequestPageProvider({ children, page }) {
  return (
    <ArrangementRequestPageContext.Provider value={page}>
      {children}
    </ArrangementRequestPageContext.Provider>
  );
}

export function useArrangementRequestPage() {
  return useContext(ArrangementRequestPageContext);
}
