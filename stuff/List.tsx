import { LayoutRectangle, ScrollView, Text } from "react-native";
import { PeepsList, PeepsItem } from "../types";
import { styles } from "../styles";
import { useEffect, useRef } from "react";

export const List = (props: ListProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  return (
    <>
      <Text style={{ fontWeight: "bold" }}>Rounds: {props.rounds}</Text>
      <ScrollView
        style={styles.scrollbox}
        contentContainerStyle={styles.alignCenter}
        ref={scrollViewRef}
      >
        {props.people.map((person, idx) => (
          <People
            key={person.id}
            person={person}
            curr={props.curr}
            idx={idx}
            scrollViewRef={scrollViewRef}
          />
        ))}
      </ScrollView>
    </>
  );
};

export const People = (props: PeopleProps) => {
  const textLayout = useRef<LayoutRectangle>();
  const isCurr = props.curr == props.idx;

  useEffect(() => {
    //code here
    if (isCurr && textLayout.current) {
      props.scrollViewRef.current?.scrollTo({
        y: textLayout.current.y,
        animated: true,
      });
    }
  }, [props.curr]);

  return (
    <Text
      onLayout={(evt) => (textLayout.current = evt.nativeEvent.layout)}
      style={isCurr ? styles.selectedPerson : {}}
    >
      <Text>{props.person.name}</Text>
      <Text> - {props.person.count}x</Text>
    </Text>
  );
};

type ListProps = {
  people: PeepsList;
  curr: number;
  rounds: number;
};

type PeopleProps = {
  person: PeepsItem;
  curr: number;
  idx: number;
  scrollViewRef: React.RefObject<ScrollView>;
};
