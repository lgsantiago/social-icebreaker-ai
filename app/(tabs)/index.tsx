import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import GameScreen from "../screens/GameScreen";
import HomeScreen from "../screens/HomeScreen";
import SetupScreen from "../screens/SetupScreen";

const Stack = createNativeStackNavigator();

export default function TabsNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Setup" component={SetupScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
    </Stack.Navigator>
  );
}
