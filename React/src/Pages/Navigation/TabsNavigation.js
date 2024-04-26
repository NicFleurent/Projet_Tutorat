import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import DrawerAccueil from "./DrawerAccueil";
import DrawerJumelage from "./DrawerJumelage";
import DrawerParametres from "./DrawerParametres";

const StackTabs = createBottomTabNavigator();

export default function TabNavigator() {

  return (
    <StackTabs.Navigator
      initialRouteName='DrawerAccueil'
      screenOptions={{
        tabBarActiveTintColor: '#E8B1F7',
        tabBarInactiveTintColor: 'white',
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
      <StackTabs.Screen name="DrawerJumelage" component={DrawerJumelage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <StackTabs.Screen name="DrawerAccueil" component={DrawerAccueil}
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
      <StackTabs.Screen name="DrawerParametres" component={DrawerParametres}
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
    </StackTabs.Navigator>
  );
}