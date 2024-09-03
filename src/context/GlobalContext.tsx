"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { GlobalState } from "@/types/types.globalContext";
import { Cell } from "@/types/types.board";

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [isWin, setIsWin] = useState(false);
  const [isStart, setIsStart] = useState(false);

  return (
    <GlobalContext.Provider value={{ board, setBoard, isWin, setIsWin, isStart, setIsStart }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = (): GlobalState => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
};
