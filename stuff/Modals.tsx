import { Modal, View, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

import {
  GeneralMdlProps,
  PersonPickerProps,
  CreateNewMdlProps,
  PeepsList,
  AddMdlProps,
} from "../types";
import { styles } from "../styles";
import { useState } from "react";

function PersonPicker({ people, selected, onChange }: PersonPickerProps) {
  return (
    <Picker
      selectedValue={selected == -1 ? people[people.length - 1].id : selected}
      onValueChange={(val, _idx) => {
        console.log(`${val} has been selected`);
        onChange(val);
        //id isn't necessarily the index
      }}
    >
      {people.map((x) => {
        return <Picker.Item label={x.name} value={x.id} key={x.id} />;
      })}
    </Picker>
  );
}

export function CreateNewMdl(props: CreateNewMdlProps) {
  const [inputText, setInputText] = useState("");
  const createSave = () => {
    // Here you can handle the input text, for example, save it to state or perform any other action.
    const peeps = inputText.trim().split("\n");
    const filteredPeeps = peeps.filter((str) => str.trim() != "");
    const peepsDict: PeepsList = filteredPeeps.map((p, idx) => {
      return { id: idx, name: p, isCurrent: idx == 0 ? true : false, count: 0 };
    });
    props.setPeople(peepsDict);
    props.setModalVisible(false);
    props.setId(0);
  };

  return (
    <GeneralModal
      props={{
        ...props,
        isAdding: false,
        onSave: createSave,
        inputText: inputText,
        setInputText: setInputText,
      }}
    />
  );
}

export function AddMdl(props: AddMdlProps) {
  const [addText, setAddText] = useState("");
  const [addAfterId, setAddAfterId] = useState(-1);

  const add = () => {
    // Here you can handle the input text, for example, save it to state or perform any other action.
    const newPeeps = addText
      .trim()
      .split("\n")
      .filter((str) => str.trim() != "");
    console.log("1", newPeeps);
    const newPeepsList: PeepsList = newPeeps.map((p, idx) => {
      return {
        id: idx + props.people.length,
        name: p,
        isCurrent: false,
        count: 0,
      };
    });
    console.log("2", newPeepsList);
    props.setPeople((oldList) => {
      console.log("add after: ", addAfterId);
      const index = oldList.findIndex((x) => {
        return x.id == addAfterId;
      });
      console.log("index: ", index);
      oldList.splice(index + 1, 0, ...newPeepsList);
      return oldList;
    });
    console.log("3", props.people);
    props.setModalVisible(false);
    console.log("4");
  };

  return (
    <GeneralModal
      props={{
        ...props,
        isAdding: true,
        onSave: add,
        inputText: addText,
        setInputText: setAddText,
        selected: addAfterId,
        setAddAfterIdx: setAddAfterId,
      }}
    />
  );
}

export function GeneralModal({ props }: GeneralMdlProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={4}
            placeholder="Enter text..."
            value={props.inputText}
            onChangeText={(text) => props.setInputText(text)}
          />
          {props.isAdding ? (
            <PersonPicker
              people={props.people}
              onChange={props.setAddAfterIdx as any}
              selected={props.selected as any}
            />
          ) : (
            <></>
          )}
          <Button title="Save" onPress={props.onSave} />
        </View>
      </View>
    </Modal>
  );
}
