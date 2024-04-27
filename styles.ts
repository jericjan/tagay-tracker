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
    justifyContent: 'center'
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
    width: "100%",
    height: "50%"
    // flex: 5,
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
});
