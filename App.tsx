import { Button, View, Text } from "react-native";
import { useState } from "react";
import { ListProps, PeepsList, PeopleProps } from "./types";
import { AddMdl, CreateNewMdl } from "./stuff/Modals";
import { styles } from "./styles";
const List = ({ people, curr }: ListProps) => {
  return (
    <>
      <Text>List of People</Text>
      {people.map((person, idx) => (
        <People key={person.id} person={person} curr={curr} idx={idx} />
      ))}
    </>
  );
};

const People = ({ person, curr, idx }: PeopleProps) => {
  const styles = curr == idx ? { backgroundColor: "red" } : {};
  return (
    <>
      <Text style={styles}>{person.name}</Text>
      <Text>{person.count}x</Text>
    </>
  );
};

export default function App() {
  const [currId, setCurrId] = useState(0);
  const [people, setPeople] = useState([] as PeepsList);

  const [createMdlVisible, setCreateMdlVisible] = useState(false);
  // const [inputText, setInputText] = useState("");
  function createNew() {
    setCreateMdlVisible(true);
  }
  const [addMdlVisible, setAddMdlVisible] = useState(false);

  const add = () => {
    setAddMdlVisible(true);
  };

  const next = (skip: boolean = false) => {
    const length = people.length;

    setCurrId((i) => {
      if (!skip) {
        setPeople((peeps) => {
          peeps[i] = { ...peeps[i], count: peeps[i].count + 1 };
          return peeps;
        });
      }

      console.log("curr idx: ", i);
      return (i + 1) % length;
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Create New" onPress={createNew} />
      {people.length ? (
        <>
          <Button title="Add People" onPress={add} />
          <Button title="Next" onPress={() => next()} />
          <Button title="Skip" onPress={() => next(true)} />
          <List people={people} curr={currId} />
        </>
      ) : (
        <></>
      )}

      <CreateNewMdl
        modalVisible={createMdlVisible}
        setModalVisible={setCreateMdlVisible}
        people={people}
        setPeople={setPeople}
        setId={setCurrId}
      />
      <AddMdl
        modalVisible={addMdlVisible}
        setModalVisible={setAddMdlVisible}
        people={people}
        setPeople={setPeople}
        // setId={setCurrId}set
      />
    </View>
  );
}
