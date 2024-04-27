import { Button, View, Text } from "react-native";
import { useState } from "react";
import { ListProps, PeepsList, PeopleProps } from "./types";
import { AddMdl, CreateNewMdl } from "./stuff/Modals";
import { styles } from "./styles";
const List = (props: ListProps) => {
  return (
    <>
      <Text>Rounds: {props.rounds}</Text>
      {props.people.map((person, idx) => (
        <People key={person.id} person={person} curr={props.curr} idx={idx} />
      ))}
    </>
  );
};

const People = ({ person, curr, idx }: PeopleProps) => {
  const styles = curr == idx ? { backgroundColor: "red" } : {};
  return (
    <Text>
      <Text style={styles}>{person.name}</Text>
      <Text> - {person.count}x</Text>
    </Text>
  );
};

export default function App() {
  const [currId, setCurrId] = useState(0);
  const [people, setPeople] = useState([] as PeepsList);
  const [roundCount, setRoundCount] = useState(0);
  const [createMdlVisible, setCreateMdlVisible] = useState(false);
  // const [inputText, setInputText] = useState("");
  function createNew() {
    setCreateMdlVisible(true);
  }
  const [addMdlVisible, setAddMdlVisible] = useState(false);
  const [addText, setAddText] = useState("");
  const [addAfterId, setAddAfterId] = useState(-1);

  const add = () => {
    setAddText("");
    setAddAfterId(-1);
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

      const newIdx = (i + 1) % length;
      console.log(`idx: ${i} -> ${newIdx}`);
      if (i > newIdx) {
        setRoundCount((i) => i + 1);
      }

      return newIdx;
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Create New" onPress={createNew} />
      {people.length ? (
        <>
          <Button title="Add People" onPress={add} />
          <View style={styles.horizontal}>
            <View style={styles.button}>
              <Button title="Next" onPress={() => next()} />
            </View>
            <View style={styles.button}>
              <Button title="Skip" onPress={() => next(true)} />
            </View>
          </View>

          <List people={people} curr={currId} rounds={roundCount} />
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
        curr={currId}
        setCurr={setCurrId}
        addText={addText}
        setAddText={setAddText}
        addAfterId={addAfterId}
        setAddAfterId={setAddAfterId}
        // setId={setCurrId}set
      />
    </View>
  );
}
