import { Modal, StyleSheet, Button, View, TextInput, Text } from "react-native";
import { useState } from "react";
import { ListProps, PeepsDict, PeopleProps } from "./types";
// You can import supported modules from npm
// import { Card } from 'react-native-paper';

// or any files within the Snack
// import AssetExample from './components/AssetExample';

const List = ({ people, setPeople, curr }: ListProps) => {
  const handleToggleCurrent = (id: number) => {
    setPeople((prevPeople) =>
      prevPeople.map((person) =>
        person.id === id ? { ...person, isCurrent: !person.isCurrent } : person
      )
    );
  };

  // const [peopleComp, setpeopleComp] = useState([]);

  // useEffect(() => {
  //   setpeopleComp(() => {
  //     console.log("peopel comp updated!");
  //     return 
  //   });
  // }, [people]);

  return (
    <>
      <Text>List of People</Text>
      {people.map((person) => (
        <People
          key={person.id}
          person={person}
          onToggleCurrent={handleToggleCurrent}
          curr={curr}
        />
      ))}
    </>
  );
};

const People = ({ person, curr }: PeopleProps) => {
  const styles = curr == person.id ? { backgroundColor: "red" } : {};

  return (
      <Text style={styles}>{person.name}</Text>
  );
};

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState("");
  const [currIdx, setCurrIdx] = useState(0);

  // list of dicts with id and name
  const [people, setPeople] = useState([] as PeepsDict);

  function add() {
    setModalVisible(true);
  }

  const handleSave = () => {
    // Here you can handle the input text, for example, save it to state or perform any other action.
    const peeps = inputText.trim().split("\n");
    const peepsDict: PeepsDict = peeps.map((p, idx) => {
      return { id: idx, name: p, isCurrent: idx == 0 ? true : false };
    });
    setPeople(peepsDict);
    setModalVisible(false);
  };

  const next = () => {
    // console.log("before ", JSON.stringify(people))
    const length = people.length;
    // const isLast = (idx) => {
    //     return idx == length - 1;
    // };

    setCurrIdx((i) => {
      console.log("curr idx: ", i);
      return (i + 1) % length;
    });

    // console.log("after ", JSON.stringify(people))
  };

  return (
    <View style={styles.container}>
      <Button title="Add People" onPress={add} />
      <Button title="Next" onPress={next} />
      <List people={people} setPeople={setPeople} curr={currIdx} />
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
            <TextInput
              style={styles.textInput}
              multiline={true}
              numberOfLines={4}
              placeholder="Enter text..."
              value={inputText}
              onChangeText={(text) => setInputText(text)}
            />
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      </Modal>
    </View>
    // <SafeAreaView style={styles.container}>
    //   <Text style={styles.paragraph}>
    //     Change code in the editor and watch it change on your phone! Save to get a shareable url.
    //   </Text>
    //   <Card>
    //     <AssetExample />
    //   </Card>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
    width: "100%",
  },
});
