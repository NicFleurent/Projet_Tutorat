import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigationDepart from "./StackNavigationDebut";
import TabNavigator from "./TabsNavigation";

export default function Navigation() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
