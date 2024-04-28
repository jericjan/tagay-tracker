import { useState } from "react";
import { HomeProps, PeepsList } from "../../types";
import { Button, StatusBar, View } from "react-native";
import { styles } from "../../styles";
import { List } from "../List";
import { AddMdl, CreateNewMdl, RemoveMdl } from "../Modals";

const Home = ({ navigation }: HomeProps) => {
  const [currIdx, setCurrIdx] = useState(0);
  const [people, setPeople] = useState([] as PeepsList);
  const [roundCount, setRoundCount] = useState(0);

  const [createMdlVisible, setCreateMdlVisible] = useState(false);
  const [inputText, setInputText] = useState("");
  function createNew() {
    setInputText("");
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

  const [remMdlVisible, setRemMdlVisible] = useState(false);

  const remove = () => {
    setRemMdlVisible(true);
  };

  const next = (skip: boolean = false) => {
    const length = people.length;

    setCurrIdx((i) => {
      if (!skip) {
        setPeople((peeps) => {
          const newPeeps = [...peeps];
          // need to shallow copy so that single person lists work

          newPeeps[i] = { ...newPeeps[i], count: newPeeps[i].count + 1 };
          return newPeeps;
        });
      }

      const newIdx = (i + 1) % length;
      console.log(`idx: ${i} -> ${newIdx}`);
      if (i > newIdx || length == 1) {
        setRoundCount((i) => i + 1);
      }

      return newIdx;
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#ffffff"
        barStyle="dark-content"
      />
      <Button title="Create New" onPress={createNew} />
      <View style={styles.measureBtn}>
        <Button
          title="Measure"
          onPress={() => navigation.navigate("Measure")}
        />
      </View>
      {people.length ? (
        <>
          <View style={styles.horizontalButCenter}>
            <Button title="Add" onPress={add} />
            <Button title="Remove" onPress={remove} />
          </View>
          <View style={styles.horizontal}>
            <View style={styles.button}>
              <Button title="Next" color="#006724" onPress={() => next()} />
            </View>
            <View style={styles.button}>
              <Button title="Skip" color="#e10b00" onPress={() => next(true)} />
            </View>
          </View>

          <List people={people} curr={currIdx} rounds={roundCount} />
        </>
      ) : (
        <></>
      )}

      <CreateNewMdl
        modalVisible={createMdlVisible}
        setModalVisible={setCreateMdlVisible}
        people={people}
        setPeople={setPeople}
        setId={setCurrIdx}
        text={inputText}
        setText={setInputText}
        setRounds={setRoundCount}
      />
      <AddMdl
        modalVisible={addMdlVisible}
        setModalVisible={setAddMdlVisible}
        people={people}
        setPeople={setPeople}
        curr={currIdx}
        setCurr={setCurrIdx}
        addText={addText}
        setAddText={setAddText}
        addAfterId={addAfterId}
        setAddAfterId={setAddAfterId}
      />
      <RemoveMdl
        modalVisible={remMdlVisible}
        setModalVisible={setRemMdlVisible}
        people={people}
        setPeople={setPeople}
        curr={currIdx}
        setCurr={setCurrIdx}
      />
    </View>
  );
};

export default Home;
