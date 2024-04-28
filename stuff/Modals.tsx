/* eslint react/no-unused-prop-types: 0 */
// eslint bugged but i checked and it's all good.

import { Modal, View, TextInput, Button, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

import {  PeepsList  } from "../types";
import { styles } from "../styles";
import { CheckboxList } from "./CheckBox";

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
    // ID !== idx
    const currId = props.people[props.curr].id;

    const removedIds = removedPeeps.map((x) => x.id);
    console.log(removedPeeps);
    props.setModalVisible(false);
    props.setPeople((oldPeeps) => {
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

      const newIdx = newPeeps.findIndex((x) => {
        console.log(x.id, currId);
        return x.id == currId;
      });

      if (currDeletable) {
        // finally delete the curr that's supposed to be deleted
        newPeeps.splice(newIdx, 1);
      }

      // update curr idx to id...
      // newIdx will always have the current Idx even if it got deleted,
      // thanks to above code in newPeeps
      console.log("new idx", newIdx);
      props.setCurr(newIdx % newPeeps.length);

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
  people: PeepsList;
  setPeople: React.Dispatch<React.SetStateAction<PeepsList>>;
};

type AddMdlProps = ChildMdlProps & {
  curr: number;
  setCurr: React.Dispatch<React.SetStateAction<number>>;
  addText: string;
  setAddText: React.Dispatch<React.SetStateAction<string>>;
  addAfterId: number;
  setAddAfterId: React.Dispatch<React.SetStateAction<number>>;
};

type CreateNewMdlProps = ChildMdlProps & {
  setId: React.Dispatch<React.SetStateAction<number>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setRounds: React.Dispatch<React.SetStateAction<number>>;
};

type GeneralMdlProps = {
  props: {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    inputText: string;
    setInputText: React.Dispatch<React.SetStateAction<string>>;
    onSave: () => void;
    people: PeepsList;
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

type RemoveMdlProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  people: PeepsList;
  setPeople: React.Dispatch<React.SetStateAction<PeepsList>>;
  curr: number;
  setCurr: React.Dispatch<React.SetStateAction<number>>;
};
