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
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Stack = createNativeStackNavigator();

const MyStack = () => {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
