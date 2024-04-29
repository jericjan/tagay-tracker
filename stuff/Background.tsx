import { ImageBackground } from "react-native";
import { styles } from "../styles";

export type DefaultBackgroundProps = {
  children: JSX.Element[];
  opacity?: number;
};

export const DefaultBackground = (props: DefaultBackgroundProps) => {
  if (!props.opacity) {
    props.opacity = 1.0;
  }

  return (
    <ImageBackground
      style={{
        ...styles.container,
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
      }}
      source={require("../static/orange.jpg")}
      imageStyle={{ opacity: props.opacity }}
      resizeMode="cover"
    >
      {props.children}
    </ImageBackground>
  );
};
