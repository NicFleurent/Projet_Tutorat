import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerContent, createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import DrawerCanevas from "./DrawerLayouts/DrawerCanevasAccueil";
import AccueilUtilisateur from "../Accueil/AccueilUtilisateur";
import GestionCompte from "../Parametres/GestionCompte";
import ResetPassword from "../Parametres/ResetPassword";
import FormulaireTuteurMatiere from "../Formulaires/FormulaireTuteur/FormulaireTuteurMatiere";
import FormulaireTuteurAide from "../Formulaires/FormulaireTuteur/FormulaireTuteurAide";
import FormulaireTuteurTuteur from "../Formulaires/FormulaireTuteur/FormulaireTuteurTuteur";
import FormulaireTuteurEvaluation from "../Formulaires/FormulaireTuteur/FormulaireTuteurEvaluation";
import FormulaireAideAide from "../Formulaires/FormulaireAide/FormulaireAideAide";
import FormulaireAideTuteur from "../Formulaires/FormulaireAide/FormulaireAideTuteur";
import FormulaireAideEvaluation from "../Formulaires/FormulaireAide/FormulaireAideEvaluation";
import ModificationRencontre from "../Accueil/ModificationRencontre";
import RevueFormAide from "../Formulaires/FormulaireAide/RevueAide";
import CommentaireFormAide from "../Formulaires/FormulaireAide/CommentaireAide";


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
            <Stack.Screen name="Jumelage - Aidé" component={FormulaireAideAide}/>
            <Stack.Screen name="Jumelage - Tuteur" component={FormulaireAideTuteur}/>
            <Stack.Screen name="Jumelage - Évaluation" component={FormulaireAideEvaluation}/>
            <Stack.Screen name="Modification - Rencontre" component={ModificationRencontre}/>
            <Stack.Screen name="Jumelage - Revue" component={RevueFormAide}/>
            <Stack.Screen name="Jumelage - Commentaire" component={CommentaireFormAide}/>
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

