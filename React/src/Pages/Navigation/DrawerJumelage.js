import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerContent, createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import DrawerCanevas from "./DrawerLayouts/DrawerCanevasAccueil";
import StackNavigationProfilTuteurs from "./StackNavigationPageDemande";
import PageDemande from "../DemandesAidesTuteurs/PageDemande";
import ListeCours from "../DemandesAidesTuteurs/ListeCours";
import Disponibilites from "../DemandesAidesTuteurs/Disponibilites";
import ListeCoursAides from "../DemandesAidesTuteurs/ListeCoursAides";
import Calendrier from "../DemandesAidesTuteurs/Calendrier";


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
                headerTitleAlign:"center"
            }}
        >
            {/*<Stack.Screen name="Tutorat" component={StackNavigationProfilTuteurs} options={{
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
            }}/>*/}
            <Stack.Screen name="Tutorat" component={PageDemande}  options={{
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
            }} />
            <Stack.Screen name="Liste des cours - Tuteur" component={ListeCours} />
            <Stack.Screen name="Disponibilités" component={Disponibilites} />
            <Stack.Screen name="Liste des cours - Aidé" component={ListeCoursAides} />
            <Stack.Screen name="Calendrier" component={Calendrier} />
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

export default function DrawerJumelage(){
    return (
        <DrawerNav/>
    );
}

