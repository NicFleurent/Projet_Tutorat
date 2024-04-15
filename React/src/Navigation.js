import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "./Pages/SplashScreen";
import Onboarding01 from "./Pages/Onboarding/Onboarding01";
import Onboarding02 from "./Pages/Onboarding/Onboarding02";
import Onboarding03 from "./Pages/Onboarding/Onboarding03";
import AuthChoice from "./Pages/Auth/AuthChoice";
import PageDemande from "./Pages/DemandesAidesTuteurs/PageDemande";
import ListeCours from "./Pages/DemandesAidesTuteurs/ListeCours";

const Stack = createNativeStackNavigator();
const StackTabs = createBottomTabNavigator();

function StackNavigator() {
  return (
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
        name="PageDemande"
        component={TabNavigator}
        options={{ headerShown: true, title: "Retour" }}
      />
 
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <StackTabs.Navigator>
      {/* Mettre les pages qui seront dans les onglets en bas */}
      <StackTabs.Screen name="page" component={PageDemande} options={{ headerShown: false }} />
      
    </StackTabs.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ListeCours"
          component={ListeCours}
          options={{ headerShown: false }}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
