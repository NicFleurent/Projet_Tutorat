import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigationDepart from "./StackNavigationDebut";
import FormulaireTuteur from "../Formulaires/FormulaireTuteur";

export default function Navigation() {
  return (
    <NavigationContainer>
      <StackNavigationDepart />
    </NavigationContainer>
  );
}
