// Library
import { createContext, useContext } from "react";

const ArrangementRequestContext = createContext();

export function ArrangementRequestProvider({ children, arrangementProps }) {
  return (
    <ArrangementRequestContext.Provider value={arrangementProps}>
      {children}
    </ArrangementRequestContext.Provider>
  );
}

export function useArrangementRequest() {
  return useContext(ArrangementRequestContext);
}
