import { LayoutRectangle, ScrollView, Text } from "react-native";
import { ListProps, PeopleProps } from "../types";
import { styles } from "../styles";
import { useEffect, useRef } from "react";

export const List = (props: ListProps) => {
  const scrollViewRef = useRef(null);

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

export const People = ({ person, curr, idx, scrollViewRef }: PeopleProps) => {
  const textLayout = useRef<LayoutRectangle>();
  const isCurr = curr == idx;

  useEffect(() => {
    //code here
    if (isCurr && textLayout.current) {
      (scrollViewRef.current as any).scrollTo({
        y: textLayout.current.y,
        animated: true,
      });
    }
  }, [curr]);

  return (
    <Text
      onLayout={(evt) => (textLayout.current = evt.nativeEvent.layout)}
      style={isCurr ? styles.selectedPerson : {}}
    >
      <Text>{person.name}</Text>
      <Text> - {person.count}x</Text>
    </Text>
  );
};
