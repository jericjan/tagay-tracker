export type PeepsList = PeepsItem[];

/**`count` is how many times they've drunk */
export type PeepsItem = {
  id: number;
  name: string;
  count: number;
};

export type RootStackParamList = {
  Home: undefined;
  Measure: undefined;
};

export type Orientation = "portrait" | "landscape";
