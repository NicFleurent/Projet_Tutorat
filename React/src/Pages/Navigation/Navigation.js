import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigationDepart from "./StackNavigationDebut";
import Drawer from "./Drawer";

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer />
    </NavigationContainer>
  );
}
