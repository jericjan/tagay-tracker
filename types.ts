export type PeepsDict = PeepsItem[]

export type PeepsItem = {
    id: number;
    name: string;
    isCurrent: boolean;
}

export type ListProps = {
    people: PeepsDict;
    setPeople: React.Dispatch<React.SetStateAction<PeepsDict>>;
    curr: number;
}

export type PeopleProps = {
    person: PeepsItem;
    onToggleCurrent:  (id: number) => void;
    curr: number;
}