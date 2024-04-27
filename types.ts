export type PeepsList = PeepsItem[];

/**`count` is how many times they've drunk */
export type PeepsItem = {
  id: number;
  name: string;
  count: number;
};

export type ListProps = {
  people: PeepsList;
  curr: number;
  rounds: number;
};

export type PeopleProps = {
  person: PeepsItem;
  curr: number;
  idx: number;
};

export type ChildMdlProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  people: PeepsList;
  setPeople: React.Dispatch<React.SetStateAction<PeepsList>>;
};

export type AddMdlProps = ChildMdlProps & {
  curr: number;
  setCurr: React.Dispatch<React.SetStateAction<number>>;
  addText: string;
  setAddText: React.Dispatch<React.SetStateAction<string>>;
  addAfterId: number;
  setAddAfterId: React.Dispatch<React.SetStateAction<number>>;
};

export type CreateNewMdlProps = ChildMdlProps & {
  setId: React.Dispatch<React.SetStateAction<number>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setRounds: React.Dispatch<React.SetStateAction<number>>;
};

export type GeneralMdlProps = {
  props: {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    inputText: string;
    setInputText: React.Dispatch<React.SetStateAction<string>>;
    onSave: () => void;
    people: PeepsList;
    isAdding: boolean;
    selected?: number;
    setAddAfterId?: React.Dispatch<React.SetStateAction<number>>;
  };
};

export type PersonPickerProps = {
  people: PeepsList;
  selected: number;
  onChange: React.Dispatch<React.SetStateAction<number>>;
};

export type CheckboxListProps = {
  items: PeepsList
  onSave: (newPeeps: PeepsList) => void;
}
export type RemoveMdlProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;  
  people: PeepsList;
  setPeople: React.Dispatch<React.SetStateAction<PeepsList>>;
}