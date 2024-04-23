import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./Pages/SplashScreen";
import Onboarding01 from "./Pages/Onboarding/Onboarding01";
import Onboarding02 from "./Pages/Onboarding/Onboarding02";
import Onboarding03 from "./Pages/Onboarding/Onboarding03";
import AuthChoice from "./Pages/Auth/AuthChoice";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import BottomTabs from "./Components/BottomTabs";
import GestionCompte from "./Pages/Parametres/GestionCompte";
import Disponibilites from "./Pages/DemandesAidesTuteurs/Disponibilites";
import ListeCours from "./Pages/DemandesAidesTuteurs/ListeCours";
import ListeCoursAides from "./Pages/DemandesAidesTuteurs/ListeCoursAides";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding01"
          component={Onboarding01}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding02"
          component={Onboarding02}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding03"
          component={Onboarding03}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthChoice"
          component={AuthChoice}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GestionCompte"
          component={GestionCompte}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Disponibilites"
          component={Disponibilites}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListeCours"
          component={ListeCours}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListeCoursAides"
          component={ListeCoursAides}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
