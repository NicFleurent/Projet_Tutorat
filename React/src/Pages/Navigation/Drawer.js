import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AccueilUtilisateur from "../BottomTabs/AccueilUtilisateur";
import GestionCompte from "../Parametres/GestionCompte";


const StackNav = () => {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator 
            screenOptions={{
                statusBarColor:"#092D74",
                headerStyle:{
                    backgroundColor:"#092D74"
                },
                headerTintColor:"#fff",
                headerTitleAlign:"center"
            }}
        >
            <Stack.Screen name="AccueilUtilisateur" component={AccueilUtilisateur}/>
            <Stack.Screen name="GestionCompte" component={GestionCompte}/>
        </Stack.Navigator>
    );
}

const DrawerNav = () =>{
    const Drawer = createDrawerNavigator();
    return(
        <Drawer.Navigator screenOptions={{ headerShown:false }} >
            <Drawer.Screen name="Accueil" component={StackNav}/>
        </Drawer.Navigator>
    );
}

export default function Drawer(){
    return (
        <DrawerNav/>
    );
}

