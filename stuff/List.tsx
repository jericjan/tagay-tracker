import { ScrollView, Text } from "react-native";
import { ListProps, PeopleProps } from "../types";
import { styles } from "../styles";

export const List = (props: ListProps) => {
  return (
    <>
      <Text>Rounds: {props.rounds}</Text>
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
  const styles = curr == idx ? { backgroundColor: "red" } : {};
  return (
    <Text>
      <Text style={styles}>{person.name}</Text>
      <Text> - {person.count}x</Text>
    </Text>
  );
};
