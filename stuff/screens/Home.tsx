import { useContext, useRef, useState } from "react";
import { PeepsList, RootStackParamList } from "../../types";
import { Button, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from "../../styles";
import { List } from "../List";
import { AddMdl, CreateNewMdl, RemoveMdl } from "../Modals";
import { DefaultBackground } from "../Background";
import { ModalContext, ScreenContext } from "../Contexts";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type HomeProps = BottomTabScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: HomeProps) => {
  const { statBarHidden, setStatBarHidden } = useContext(ScreenContext);
  const [currIdx, setCurrIdx] = useState(0);
  const [people, setPeople] = useState([] as PeepsList);
  const [roundCount, setRoundCount] = useState(0);

  const createBtnClick = useRef(() => {});
  const addBtnClick = useRef(() => {});
  const RemoveBtnClick = useRef(() => {});

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
      <DefaultBackground>
        {!statBarHidden ? (
          <StatusBar
            // animated={false}
            translucent={false}
            backgroundColor="#ffffff"
            // style="dark"
            hidden={false}
          />
        ) : (
          <></>
        )}
        <Button
          title="Create New"
          onPress={() => {
            createBtnClick.current();
          }}
        />
        <View style={styles.measureBtn}>
          <Button
            title="Measure"
            onPress={() => {
              setStatBarHidden(true);
              navigation.navigate("Measure");
            }}
          />
        </View>
        {people.length ? (
          <>
            <View style={styles.horizontalButCenter}>
              <Button
                title="Add"
                onPress={() => {
                  addBtnClick.current();
                }}
              />
              <Button
                title="Remove"
                onPress={() => {
                  RemoveBtnClick.current();
                }}
              />
            </View>
            <View style={{ ...styles.horizontal, ...styles.onTop }}>
              <View style={styles.button}>
                <Button title="Next" color="#006724" onPress={() => next()} />
              </View>
              <View style={styles.button}>
                <Button
                  title="Skip"
                  color="#e10b00"
                  onPress={() => next(true)}
                />
              </View>
            </View>

            <List people={people} curr={currIdx} rounds={roundCount} />
          </>
        ) : (
          <></>
        )}
        <ModalContext.Provider
          value={{ people, setPeople, currIdx, setCurrIdx, setRoundCount }}
        >
          <CreateNewMdl btnClick={createBtnClick} />
          <AddMdl btnClick={addBtnClick} />
          <RemoveMdl btnClick={RemoveBtnClick} />
        </ModalContext.Provider>
      </DefaultBackground>
    </View>
  );
};

export default Home;
