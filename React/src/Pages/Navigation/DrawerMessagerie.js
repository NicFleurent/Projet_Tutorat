import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerContent, createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DrawerCanevas from "./DrawerLayouts/DrawerCanevasAccueil";
import Messagerie from "../Messagerie/Messagerie";
import Chat from "../Messagerie/ChatPage";

const StackNav = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: "#092D74",
        headerStyle: {
          backgroundColor: "#092D74",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerBackTitleVisible: "false",
      }}
    >
      <Stack.Screen
        name="Messagerie"
        component={Messagerie}
        options={{
          headerLeft: () => {
            return (
              <Ionicons
                name="menu"
                color="#fff"
                size={30}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            );
          },
        }}
      />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerCanevas {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="StackNav" component={StackNav} />
    </Drawer.Navigator>
  );
};

export default function DrawerParametres() {
  return <DrawerNav />;
}
