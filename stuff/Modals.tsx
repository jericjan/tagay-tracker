import { Modal, View, TextInput, Button, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

import {
  GeneralMdlProps,
  PersonPickerProps,
  CreateNewMdlProps,
  PeepsList,
  AddMdlProps,
  RemoveMdlProps,
} from "../types";
import { styles } from "../styles";
import { CheckboxList } from "./CheckBox";

function PersonPicker({ people, selected, onChange }: PersonPickerProps) {
  return (
    <>
      <Text>Add after:</Text>
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
    </>
  );
}

export function CreateNewMdl(props: CreateNewMdlProps) {
  //   const [inputText, setInputText] = useState("");
  const createSave = () => {
    // Here you can handle the input text, for example, save it to state or perform any other action.
    const peeps = props.text.trim().split("\n");
    const filteredPeeps = peeps.filter((str) => str.trim() != "");
    const peepsDict: PeepsList = filteredPeeps.map((p, idx) => {
      return { id: idx, name: p, isCurrent: idx == 0 ? true : false, count: 0 };
    });
    props.setPeople(peepsDict);
    props.setModalVisible(false);
    props.setId(0);
    props.setRounds(0);
  };

  return (
    <GeneralModal
      props={{
        ...props,
        isAdding: false,
        onSave: createSave,
        inputText: props.text,
        setInputText: props.setText,
      }}
    />
  );
}

export function AddMdl(props: AddMdlProps) {
  const add = () => {
    // Here you can handle the input text, for example, save it to state or perform any other action.
    const newPeeps = props.addText
      .trim()
      .split("\n")
      .filter((str) => str.trim() != "");

    const newPeepsList: PeepsList = newPeeps.map((p, idx) => {
      const oldIds = props.people.map((x) => x.id);
      const lastId = Math.max(...oldIds);
      console.log("last id is ", lastId);
      return {
        id: idx + lastId + 1, // starts at idx=0, and we don't want to have the same id as lastId
        name: p,
        isCurrent: false,
        count: 0,
      };
    });

    props.setPeople((oldList) => {
      const insertIdx = (() => {
        if (props.addAfterId == -1) {
          return props.people.length - 1;
        } else {
          return oldList.findIndex((x) => {
            return x.id == props.addAfterId;
          });
        }
      })();

      const currIdx = props.curr;

      if (insertIdx < currIdx) {
        props.setCurr((i) => i + newPeepsList.length);
      }

      oldList.splice(insertIdx + 1, 0, ...newPeepsList);
      return oldList;
    });

    props.setModalVisible(false);
  };

  return (
    <GeneralModal
      props={{
        ...props,
        isAdding: true,
        onSave: add,
        inputText: props.addText,
        setInputText: props.setAddText,
        selected: props.addAfterId,
      }}
    />
  );
}

export function RemoveMdl(props: RemoveMdlProps) {
  const submit = (removedPeeps: PeepsList) => {
    const removedIds = removedPeeps.map((x) => x.id);
    console.log(removedPeeps);
    props.setModalVisible(false);
    props.setPeople((oldPeeps) => {
      // filter out ones tha are not in removedIds
      return oldPeeps.filter((peep) => !removedIds.some((id) => id == peep.id));
    });
  };

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
          <CheckboxList items={props.people} onSave={submit} />
          {/* <Button title="Save" onPress={submit} /> */}
        </View>
      </View>
    </Modal>
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
              onChange={props.setAddAfterId as any}
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
