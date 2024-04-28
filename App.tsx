import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./stuff/screens/Home";
import { RootStackParamList } from "./types";
import MeasurePage from "./stuff/screens/Measure";

export default function App() {
  const Tab = createBottomTabNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { height: 0, position: "absolute", display: "none" },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ title: "Tagay Tracker" }}
        />
        <Tab.Screen
          name="Measure"
          component={MeasurePage}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

