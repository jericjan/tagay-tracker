export type PeepsDict = PeepsItem[]

export type PeepsItem = {
    id: number;
    name: string;
    isCurrent: boolean;
}

export type ListProps = {
    people: PeepsDict;
    curr: number;
}

export type PeopleProps = {
    person: PeepsItem;
    curr: number;
}