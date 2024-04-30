import React, { useEffect, useState } from "react";
import { styles } from "../styles";
import { StyleSheet, Text, View } from "react-native";
import { getCalendars } from "expo-localization";
import Clock from "react-live-clock";
import { getBatteryLevelAsync } from "expo-battery";

const MyClock = () => {
  const [timezone] = useState(getCalendars()[0].timeZone);
  return timezone ? (
    <Clock
      style={styles.clock}
      element={Text}
      format={"hh:mm:ss A"}
      ticking={true}
      timezone={timezone}
    />
  ) : (
    <></>
  );
};

const Battery = () => {
  const [batt, setBatt] = useState(-1);

  const battCheck = async () => {
    console.log("batt check");
    const lvl = await getBatteryLevelAsync();
    setBatt(Math.ceil(lvl * 100));
    setTimeout(battCheck, 1000);
  };

  useEffect(() => {
    battCheck();
  }, []);

  const styles = StyleSheet.create({
    battParent: {
      alignItems: "center",
      marginBottom: 10,
    },
    battBase: {
      height: 5,
      borderRadius: 5,
    },
    battTop: {
      backgroundColor: "white",
      width: "100%",
    },
    battBot: {
      height: 5,
      backgroundColor: "green",
      width: `${batt}%`,
    },
  });

  return batt != -1 ? (
    <View style={styles.battParent}>
      <Text>Battery: {batt}%</Text>
      <View style={[styles.battBase, styles.battTop]}>
        <View style={[styles.battBase, styles.battBot]}></View>
      </View>
    </View>
  ) : (
    <></>
  );
};

export const InfoBox = () => {
  return (
    <View>
      <MyClock />
      <Battery />
    </View>
  );
};
