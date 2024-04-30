import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    width: "100%",
    maxHeight: "50%",
    flexGrow: 0,
    justifyContent: "center",
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
    width: "100%",
    height: "50%",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 0,
    margin: 20,
  },
  button: {
    width: "37%",
  },
  scrollbox: {
    width: "100%",
    maxHeight: "75%",
    flexGrow: 0,
  },
  alignCenter: {
    alignItems: "center",
  },
  measureBtn: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  selectedPerson: {
    backgroundColor: "rgb(215 200 42)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 30,

    // https://ethercreative.github.io/react-native-shadow-generator/
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  horizontalButCenter: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    margin: 10,
  },
  onTop: {
    zIndex: 999,
  },
  clock: {
    color: "white",

    fontSize: 50,
    textShadowColor: "#000",
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.58,
    textShadowRadius: 7.0,

    elevation: 24,
  },
});
