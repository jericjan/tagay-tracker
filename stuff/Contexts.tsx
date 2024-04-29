import { createContext } from "react";
import { PeepsList } from "../types";

type ModalContextType = {
  people: PeepsList;
  setPeople: React.Dispatch<React.SetStateAction<PeepsList>>;
  currIdx: number;
  setCurrIdx: React.Dispatch<React.SetStateAction<number>>;
};

export const ModalContext = createContext({} as ModalContextType);
