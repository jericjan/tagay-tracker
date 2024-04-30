import { Modal, View, TextInput, Button, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { PeepsList } from "../types";
import { styles } from "../styles";
import { CheckboxList } from "./CheckBox";
import { useContext, useEffect, useState } from "react";
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
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState("");
  const { setPeople, setCurrIdx, setRoundCount } = useContext(ModalContext);
  useEffect(() => {
    props.btnClick.current = () => {
      setInputText("");
      setModalVisible(true);
    };
  }, []);

  const createSave = () => {
    const peeps = inputText.trim().split("\n");
    const filteredPeeps = peeps.filter((str) => str.trim() != "");
    const peepsDict: PeepsList = filteredPeeps.map((p, idx) => {
      return { id: idx, name: p, isCurrent: idx == 0 ? true : false, count: 0 };
    });
    setPeople(peepsDict);
    setModalVisible(false);
    setCurrIdx(0);
    setRoundCount(0);
  };

  return (
    <GeneralModal
      props={{
        setModalVisible,
        modalVisible,
        onSave: createSave,
        inputText,
        setInputText,
      }}
    />
  );
}

export function AddMdl(props: AddMdlProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState("");
  const [addAfterId, setAddAfterId] = useState(-1);
  const { people, setPeople, currIdx, setCurrIdx } = useContext(ModalContext);

  useEffect(() => {
    props.btnClick.current = () => {
      setInputText("");
      setAddAfterId(-1);
      setModalVisible(true);
    };
  }, []);

  const add = () => {
    const newPeeps = inputText
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
        if (addAfterId == -1) {
          return people.length - 1;
        } else {
          return oldList.findIndex((x) => {
            return x.id == addAfterId;
          });
        }
      })();

      if (insertIdx < currIdx) {
        setCurrIdx((i) => i + newPeepsList.length);
      }

      oldList.splice(insertIdx + 1, 0, ...newPeepsList);
      return [...oldList];
    });

    setModalVisible(false);
  };

  return (
    <GeneralModal
      props={{
        onSave: add,
        inputText,
        setInputText,
        modalVisible,
        setModalVisible,
      }}
    >
      <PersonPicker
        people={people}
        onChange={setAddAfterId as React.Dispatch<React.SetStateAction<number>>}
        selected={addAfterId as number}
      />
    </GeneralModal>
  );
}

export function RemoveMdl(props: RemoveMdlProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const { people, setPeople, currIdx, setCurrIdx, setRoundCount } =
    useContext(ModalContext);

  useEffect(() => {
    props.btnClick.current = () => {
      setModalVisible(true);
    };
  }, []);

  const submit = (removedPeeps: PeepsList) => {
    // ID !== idx
    const currId = people[currIdx].id;

    const removedIds = removedPeeps.map((x) => x.id);
    console.log(removedPeeps);
    setModalVisible(false);
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
        setRoundCount((i) => i + 1);
      }
      return newPeeps;
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <CheckboxList items={people} onSave={submit} />
        </View>
      </View>
    </Modal>
  );
}

export function GeneralModal({ props, children }: GeneralMdlProps) {
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
          {children ? children : <></>}
          <Button title="Save" onPress={props.onSave} />
        </View>
      </View>
    </Modal>
  );
}

type InitialMdlProps = {
  btnClick: React.MutableRefObject<() => void>;
};

type AddMdlProps = InitialMdlProps;
type CreateNewMdlProps = InitialMdlProps;
type RemoveMdlProps = InitialMdlProps;

type GeneralMdlProps = {
  props: {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    inputText: string;
    setInputText: React.Dispatch<React.SetStateAction<string>>;
    onSave: () => void;
  };
  children?: JSX.Element[] | JSX.Element;
};

type PersonPickerProps = {
  people: PeepsList;
  selected: number;
  onChange: React.Dispatch<React.SetStateAction<number>>;
};
