import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerContent, createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import DrawerCanevas from "./DrawerLayouts/DrawerCanevasAccueil";
import AccueilUtilisateur from "../BottomTabs/AccueilUtilisateur";
import GestionCompte from "../Parametres/GestionCompte";
import ResetPassword from "../Parametres/ResetPassword";
import FormulaireTuteurMatiere from "../Formulaires/FormulaireTuteur/FormulaireTuteurMatiere";
import FormulaireTuteurAide from "../Formulaires/FormulaireTuteur/FormulaireTuteurAide";
import FormulaireTuteurTuteur from "../Formulaires/FormulaireTuteur/FormulaireTuteurTuteur";
import FormulaireTuteurEvaluation from "../Formulaires/FormulaireTuteur/FormulaireTuteurEvaluation";


const StackNav = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    return(
        <Stack.Navigator 
            screenOptions={{
                statusBarColor:"#092D74",
                headerStyle:{
                    backgroundColor:"#092D74"
                },
                headerTintColor:"#fff",
                headerTitleAlign:"center",
                headerBackTitleVisible: 'false',
            }}
        >
            <Stack.Screen name="Accueil" component={AccueilUtilisateur} options={{
                headerLeft:()=>{
                    return(
                        <Ionicons
                            name="menu"
                            color="#fff"
                            size={30}
                            onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
                        />
                    );
                }
            }}/>
            <Stack.Screen name="Modification du compte" component={GestionCompte}/>
            <Stack.Screen name="Modification du mot de passe" component={ResetPassword}/>
            <Stack.Screen name="Rencontres - Matière vu" component={FormulaireTuteurMatiere}/>
            <Stack.Screen name="Rencontres - Aidé" component={FormulaireTuteurAide}/>
            <Stack.Screen name="Rencontres - Tuteur" component={FormulaireTuteurTuteur}/>
            <Stack.Screen name="Rencontres - Évaluation" component={FormulaireTuteurEvaluation}/>
        </Stack.Navigator>
    );
}

const DrawerNav = () =>{
    const Drawer = createDrawerNavigator();
    return(
        <Drawer.Navigator 
            drawerContent={props => <DrawerCanevas {...props}/>}
            screenOptions={{ headerShown:false }} 
        >
            <Drawer.Screen name="StackNav" component={StackNav}/>
        </Drawer.Navigator>
    );
}

export default function DrawerAccueil(){
    return (
        <DrawerNav/>
    );
}

