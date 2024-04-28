import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type PeepsList = PeepsItem[];

/**`count` is how many times they've drunk */
export type PeepsItem = {
  id: number;
  name: string;
  count: number;
};




export type CheckboxListProps = {
  items: PeepsList;
  onSave: (newPeeps: PeepsList) => void;
};


export type RootStackParamList = {
  Home: undefined;
  Measure: undefined;
};

export type HomeProps = BottomTabScreenProps<RootStackParamList, "Home">;
export type MeasureProps = BottomTabScreenProps<RootStackParamList, "Measure">;

export type Orientation = "portrait" | "landscape";

export type DefaultBackgroundProps = {
  children: JSX.Element[];
  opacity?: number;
};
