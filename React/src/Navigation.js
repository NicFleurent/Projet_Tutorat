import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "./Pages/SplashScreen";
import Onboarding01 from "./Pages/Onboarding/Onboarding01";
import PageDemande from "./Pages/DemandesAidesTuteurs/PageDemande";


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
      <StackNavigator />
    </NavigationContainer>
  );
}
