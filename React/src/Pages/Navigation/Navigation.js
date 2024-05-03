import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigationDepart from "./StackNavigationDebut";
export default function Navigation() {
  return (
    <NavigationContainer>
      <StackNavigationDepart />
    </NavigationContainer>
  );
}
