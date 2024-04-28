import {
  Animated,
  Button,
  Dimensions,
  PanResponder,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MeasureProps, Orientation } from "../../types";
import { useRef, useState } from "react";

export default function MeasurePage({ navigation }: MeasureProps) {
  const { width, height } = Dimensions.get("window");

  const pan = useRef(new Animated.ValueXY()).current;
  const panX = useRef(0);
  const panY = useRef(0);
  pan.addListener((val) => {
    panX.current = val.x;
    panY.current = val.y;
    // console.log(val.x, val.y);
  });
  const [orientation, setOrientation] = useState("portrait" as Orientation);
  const orientRef = useRef("portrait" as Orientation); // used in Animated.event

  const boxCss = {
    portrait: {
      width: 10,
    },
    landscape: {
      height: 10,
    },
  };
  const transformOptions = {
    portrait: {
      transform: [{ translateX: pan.x }],
      height: height,
    },
    landscape: {
      transform: [{ translateY: pan.y }],
      width: width,
    },
  };

  console.log(pan.x, pan.y);

  function limitHit(value: number, minMax: number) {
    return Math.abs(value) >= minMax;
  }

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      // onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      //   useNativeDriver: false,
      // }),
      onPanResponderMove: (evt, gestureState) => {
        // console.log(gestureState.dx, gestureState.dy);
        // console.log(`${width}x${height}`);
        // offset stays the same while dragging, value doesn't
        // const panY = pan.getTranslateTransform()[1].translateY as any;
        // const panX = pan.getTranslateTransform()[0].translateX as any;
        // const currX = (panX._offset = panX._value);
        // const currY = (panY._offset = panY._value);

        // const moveBack = (curr: number, screenLen: number) => {
        //   var coord = screenLen / 2 - 10;
        //   if (curr < 0) {
        //     coord *= -1;
        //   }
        //   return coord;
        // };

        function haveSameSign(num1: number, num2: number) {
          return Math.sign(num1) === Math.sign(num2);
        }

        const [x, y] = [panX.current, panY.current];
        if (limitHit(x, width / 2)) {
          console.log("Out of bounds!", x);
          // pan.setValue({ x: moveBack(x, width), y: y });
          if (haveSameSign(gestureState.dx, x)) {
            return false;
          }
        }

        if (limitHit(y, height / 2)) {
          console.log("Out of bounds!", y);
          // pan.setValue({ x:x, y: moveBack(y, height)});
          if (haveSameSign(gestureState.dy, y)) {
            return false;
          }
        }
        const animOptions = {
          portrait: { dx: pan.x },
          landscape: { dy: pan.y },
        };

        Animated.event([null, animOptions[orientRef.current]], {
          useNativeDriver: false,
        })(evt, gestureState);
      },
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  ).current;

  const rotate = () => {
    const newOrient = orientation == "portrait" ? "landscape" : "portrait";
    console.log(orientation, newOrient);
    setOrientation(newOrient);
    orientRef.current = newOrient;
  };

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
      ...boxCss[orientation],
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
    button: {
      zIndex: 999,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar animated={true} hidden={true} />
      <View style={styles.button}>
        <Button title="Rotate" onPress={rotate} />
      </View>
      <Text style={styles.titleText}>Drag anywhere on the screen!</Text>
      <View style={styles.draggableContainer} {...panResponder.panHandlers}>
        <Animated.View style={[styles.box, transformOptions[orientation]]} />
      </View>
    </View>
  );
}
