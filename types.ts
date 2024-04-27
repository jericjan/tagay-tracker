export type PeepsList = PeepsItem[];

/**`count` is how many times they've drunk */
export type PeepsItem = {
  id: number;
  name: string;
  isCurrent: boolean;
  count: number;
};

export type ListProps = {
  people: PeepsList;
  curr: number;
};

export type PeopleProps = {
  person: PeepsItem;
  curr: number;
  idx: number;
};

export type AddMdlProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  people: PeepsList;
  setPeople: React.Dispatch<React.SetStateAction<PeepsList>>;
};

export type CreateNewMdlProps = AddMdlProps & {
  setId: React.Dispatch<React.SetStateAction<number>>;
};

export type BaseMdlProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => void;
  people: PeepsList;
};

export type GeneralMdlProps = {
  props: BaseMdlProps & {
    isAdding: boolean;
    selected?: number;
    setAddAfterIdx?: React.Dispatch<React.SetStateAction<number>>;
  };
};

export type PersonPickerProps = {
  people: PeepsList;
  selected: number;
  onChange: React.Dispatch<React.SetStateAction<number>>;
};
