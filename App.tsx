import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./stuff/screens/Home";
import { RootStackParamList } from "./types";
import MeasurePage from "./stuff/screens/Measure";

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Tagay Tracker" }}
        />
        <Stack.Screen name="Measure" component={MeasurePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
