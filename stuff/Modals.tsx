import { Modal, View, TextInput, Button, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { PeepsList } from "../types";
import { styles } from "../styles";
import { CheckboxList } from "./CheckBox";
import { useContext } from "react";
import { ModalContext } from "./Contexts";

function PersonPicker({ people, selected, onChange }: PersonPickerProps) {
  return (
    <>
      <Text>Add after:</Text>
      <Picker
        selectedValue={selected == -1 ? people[people.length - 1].id : selected}
        onValueChange={(val) => {
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
  const { setPeople, setCurrIdx } = useContext(ModalContext);
  const { modalVisible } = props; // prop drill :(
  const createSave = () => {
    const peeps = props.text.trim().split("\n");
    const filteredPeeps = peeps.filter((str) => str.trim() != "");
    const peepsDict: PeepsList = filteredPeeps.map((p, idx) => {
      return { id: idx, name: p, isCurrent: idx == 0 ? true : false, count: 0 };
    });
    setPeople(peepsDict);
    props.setModalVisible(false);
    setCurrIdx(0);
    props.setRounds(0);
  };

  return (
    <GeneralModal
      props={{
        ...props,
        modalVisible,
        isAdding: false,
        onSave: createSave,
        inputText: props.text,
        setInputText: props.setText,
      }}
    />
  );
}

export function AddMdl(props: AddMdlProps) {
  const { people, setPeople, currIdx, setCurrIdx } = useContext(ModalContext);
  const { modalVisible, setAddAfterId } = props; // prop drill :(
  const add = () => {
    const newPeeps = props.addText
      .trim()
      .split("\n")
      .filter((str) => str.trim() != "");

    const newPeepsList: PeepsList = newPeeps.map((p, idx) => {
      const oldIds = people.map((x) => x.id);
      const lastId = Math.max(...oldIds);
      console.log("last id is ", lastId);
      return {
        id: idx + lastId + 1, // starts at idx=0, and we don't want to have the same id as lastId
        name: p,
        isCurrent: false,
        count: 0,
      };
    });

    setPeople((oldList) => {
      const insertIdx = (() => {
        if (props.addAfterId == -1) {
          return people.length - 1;
        } else {
          return oldList.findIndex((x) => {
            return x.id == props.addAfterId;
          });
        }
      })();

      if (insertIdx < currIdx) {
        setCurrIdx((i) => i + newPeepsList.length);
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
        modalVisible,
        setAddAfterId,
      }}
    />
  );
}

export function RemoveMdl(props: RemoveMdlProps) {
  const { people, setPeople, currIdx, setCurrIdx } = useContext(ModalContext);
  const submit = (removedPeeps: PeepsList) => {
    // ID !== idx
    const currId = people[currIdx].id;

    const removedIds = removedPeeps.map((x) => x.id);
    console.log(removedPeeps);
    props.setModalVisible(false);
    setPeople((oldPeeps) => {
      // filter out ones tha are not in removedIds
      const currDeletable = removedIds.includes(currId);

      const newPeeps = (() => {
        if (currDeletable) {
          return oldPeeps.filter(
            (peep) => !removedIds.includes(peep.id) || peep.id == currId
          );
        } else {
          return oldPeeps.filter((peep) => !removedIds.includes(peep.id));
        }
      })();

      // find new index, curr will still exist when deleted
      const newIdx = newPeeps.findIndex((x) => {
        console.log(x.id, currId);
        return x.id == currId;
      });

      if (currDeletable) {
        // finally delete the curr that's supposed to be deleted
        // on deletion, the next available person will shift backwards and take its place
        newPeeps.splice(newIdx, 1);
      }

      // update curr idx to id
      console.log("new idx", newIdx);
      const correctedIdx = newIdx % newPeeps.length;
      setCurrIdx(correctedIdx);
      if (correctedIdx == 0) {
        props.setRounds((i) => i + 1);
      }
      return newPeeps;
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
          <CheckboxList items={people} onSave={submit} />
          {/* <Button title="Save" onPress={submit} /> */}
        </View>
      </View>
    </Modal>
  );
}

export function GeneralModal({ props }: GeneralMdlProps) {
  const { people } = useContext(ModalContext);
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
              people={people}
              onChange={
                props.setAddAfterId as React.Dispatch<
                  React.SetStateAction<number>
                >
              }
              selected={props.selected as number}
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

type ChildMdlProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type AddMdlProps = ChildMdlProps & {
  addText: string;
  setAddText: React.Dispatch<React.SetStateAction<string>>;
  addAfterId: number;
  setAddAfterId: React.Dispatch<React.SetStateAction<number>>;
};

type CreateNewMdlProps = ChildMdlProps & {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setRounds: React.Dispatch<React.SetStateAction<number>>;
};
type RemoveMdlProps = ChildMdlProps & {
  setRounds: React.Dispatch<React.SetStateAction<number>>;
};

type GeneralMdlProps = {
  props: {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    inputText: string;
    setInputText: React.Dispatch<React.SetStateAction<string>>;
    onSave: () => void;
    isAdding: boolean;
    selected?: number;
    setAddAfterId?: React.Dispatch<React.SetStateAction<number>>;
  };
};

type PersonPickerProps = {
  people: PeepsList;
  selected: number;
  onChange: React.Dispatch<React.SetStateAction<number>>;
};
