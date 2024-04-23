import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PageDemande from "../DemandesAidesTuteurs/PageDemande";
import ListeCours from "../DemandesAidesTuteurs/ListeCours";
import Disponibilites from "../DemandesAidesTuteurs/Disponibilites";
import ListeCoursAides from "../DemandesAidesTuteurs/ListeCoursAides";
import Calendrier from "../DemandesAidesTuteurs/Calendrier";


const Stack = createNativeStackNavigator();

export default function StackNavigationProfilTuteurs() {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="PageDemande" component={PageDemande} />
            <Stack.Screen name="ListeCours" component={ListeCours} />
            <Stack.Screen name="Disponibilites" component={Disponibilites} />
            <Stack.Screen name="ListeCoursAides" component={ListeCoursAides} />
            <Stack.Screen name="Calendrier" component={Calendrier} />
        </Stack.Navigator>
    )
}