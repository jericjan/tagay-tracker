import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MeasureProps } from "../../types";
import { useRef } from "react";

const { height } = Dimensions.get("window");

export default function MeasurePage({ navigation }: MeasureProps) {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: true,
      }),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag this box horizontally!</Text>
      <View style={styles.draggableContainer} {...panResponder.panHandlers}>
        <Animated.View
          style={[
            styles.box,
            {
              transform: [{ translateX: pan.x }],
              height: height,
            },
          ]}
          {...panResponder.panHandlers}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
  },
  box: {
    width: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  draggableContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
});
