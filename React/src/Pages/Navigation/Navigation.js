import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigationDepart from "./StackNavigationDebut";
import StackNavigationProfilAides from "./StackNavigationProfilAides";
import StackNavigationProfilTuteurs from "./StackNavigationProfilTuteurs";



export default function Navigation() {
  return (
    <NavigationContainer>
      <StackNavigationDepart/>     
    </NavigationContainer>
  );
}
