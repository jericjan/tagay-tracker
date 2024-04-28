import { ScrollView, Text } from "react-native";
import { ListProps, PeopleProps } from "../types";
import { styles } from "../styles";
import { useEffect, useRef } from "react";

export const List = (props: ListProps) => {
  return (
    <>
      <Text style={{ fontWeight: "bold" }}>Rounds: {props.rounds}</Text>
      <ScrollView
        style={styles.scrollbox}
        contentContainerStyle={styles.alignCenter}
      >
        {props.people.map((person, idx) => (
          <People key={person.id} person={person} curr={props.curr} idx={idx} />
        ))}
      </ScrollView>
    </>
  );
};

export const People = ({ person, curr, idx }: PeopleProps) => {
  const text = useRef(null);
  const isCurr = curr == idx;

  useEffect(() => {
    //code here
    if (isCurr) {
      (text.current as any)?.scrollIntoView();
    }
  }, [curr]);

  return (
    <Text ref={text} style={isCurr ? styles.selectedPerson : {}}>
      <Text>{person.name}</Text>
      <Text> - {person.count}x</Text>
    </Text>
  );
};
