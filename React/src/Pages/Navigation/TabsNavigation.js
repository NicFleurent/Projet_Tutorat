import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import GestionCompte from '../Parametres/GestionCompte';
import AccueilUtilisateur from "../BottomTabs/AccueilUtilisateur";
import StackNavigationProfilPageDemande from './StackNavigationPageDemande';

const StackTabs = createBottomTabNavigator();

export default function TabNavigator() {

  return (
    <StackTabs.Navigator
      initialRouteName='AccueilUtilisateurs'
      screenOptions={{
        tabBarActiveTintColor: '#E8B1F7',
        tabBarInactiveTintColor: '#E8B1F7',
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 90,
          backgroundColor: '#092D74',
        },
        tabBarLabelStyle: {
          fontSize: 13,
        }
      }}
    >
      {/* Mettez les pages qui seront dans les onglets ici */}
      <StackTabs.Screen name="StackNavigationPageDemande" component={StackNavigationProfilPageDemande}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <StackTabs.Screen name="AccueilUtilisateurs" component={AccueilUtilisateur}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <StackTabs.Screen name="Compte" component={GestionCompte}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
    </StackTabs.Navigator>
  );
}