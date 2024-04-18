import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import Disponibilites from "../Pages/DemandesAidesTuteurs/Disponibilites";
import Calendrier from "../Pages/DemandesAidesTuteurs/Calendrier";
import PageDemande from '../Pages/DemandesAidesTuteurs/PageDemande';

const StackTabs = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <StackTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#E8B1F7',
        tabBarInactiveTintColor: 'grey',
        tabBarShowLabel :false,
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
      <StackTabs.Screen name="PageDemande" component={PageDemande}
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
      <StackTabs.Screen name="Accueil" component={Calendrier} 
      options={{ 
        headerShown: false,
        tabBarIcon: ({ color,  focused }) => (
          <Ionicons 
            name={focused ? "home" : "home-outline"} 
            color={color} 
            size={30} 
          />
        ),
         }} 
         />
        <StackTabs.Screen name="Compte" component={Calendrier} 
      options={{ 
        headerShown: false,
        tabBarIcon: ({ color,  focused }) => (
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