import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PageDemande from "../DemandesAidesTuteurs/PageDemande";
import ListeCoursAides from "../DemandesAidesTuteurs/ListeCoursAides";
import Calendrier from "../DemandesAidesTuteurs/Calendrier";

const Stack = createNativeStackNavigator();

export default function StackNavigationProfilAides() {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="PageDemande" component={PageDemande} />
            <Stack.Screen name="ListeCoursAides" component={ListeCoursAides} />
            <Stack.Screen name="Calendrier" component={Calendrier} />
        </Stack.Navigator>
    )
}