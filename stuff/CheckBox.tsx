import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { PeepsItem, PeepsList } from "../types";

export const CheckboxList = (props: CheckboxListProps) => {
  const [selectedItems, setSelectedItems] = useState([] as PeepsList);

  const toggleItem = (item: PeepsItem) => {
    const index = selectedItems.findIndex((x) => x.id == item.id);
    if (index > -1) {
      setSelectedItems(selectedItems.filter((x) => x.id != item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollBox}>
        {props.items.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => toggleItem(item)}
            style={({ pressed }) => [
              styles.item,
              {
                backgroundColor:
                  pressed || selectedItems.includes(item) ? "#CCCCCC" : "white",
              },
            ]}
          >
            <Text>{item.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? "#CCCCCC" : "#007bff" },
          ]}
          onPress={() => {
            props.onSave(selectedItems);
          }}
        >
          <Text style={styles.buttonText}>Remove</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  item: {
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    height: 40,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  scrollBox: {
    maxHeight: "80%",
  },
});

type CheckboxListProps = {
  items: PeepsList;
  onSave: (newPeeps: PeepsList) => void;
};