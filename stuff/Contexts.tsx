import { createContext } from "react";
import { PeepsList } from "../types";

type ModalContextType = {
  people: PeepsList;
  setPeople: React.Dispatch<React.SetStateAction<PeepsList>>;
  currIdx: number;
  setCurrIdx: React.Dispatch<React.SetStateAction<number>>;
  setRoundCount: React.Dispatch<React.SetStateAction<number>>;
};

export const ModalContext = createContext({} as ModalContextType);

type screenCtx = {
  statBarHidden: boolean;
  setStatBarHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ScreenContext = createContext({} as screenCtx);
