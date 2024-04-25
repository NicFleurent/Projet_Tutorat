import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../SplashScreen";
import Onboarding01 from "../Onboarding/Onboarding01";
import Onboarding02 from "../Onboarding/Onboarding02";
import Onboarding03 from "../Onboarding/Onboarding03";
import AuthChoice from "../Auth/AuthChoice";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import TabsNavigation from "../Navigation/TabsNavigation";
import ResetPassword from "../Parametres/ResetPassword";

const Stack = createNativeStackNavigator();

export default function StackNavigationDepart() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Onboarding01" component={Onboarding01} />
      <Stack.Screen name="Onboarding02" component={Onboarding02} />
      <Stack.Screen name="Onboarding03" component={Onboarding03} />
      <Stack.Screen name="AuthChoice" component={AuthChoice} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="TabsNavigation" component={TabsNavigation} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}
