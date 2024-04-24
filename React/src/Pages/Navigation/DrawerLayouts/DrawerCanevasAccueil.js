import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const DrawerList = [
    {icon: 'home', label: 'Accueil', navigateTo:'Accueil'},
    {icon: 'person-circle', label: 'Modifier le compte', navigateTo:'GestionCompte'},
    {icon: 'settings', label: 'Changer le mot de passe', navigateTo:'GestionCompte'}
]

const DrawerLayout = ({icon, label, navigateTo}) => {
    const navigation = useNavigation();
    return(
        <DrawerItem
            icon={() => <Ionicons name={icon} color="#092D74" size={20} style={styles.icons} />}
            label={label}
            labelStyle={{color:"#092D74"}}
            onPress={()=>{
                navigation.navigate(navigateTo);
            }}
        />
    )
}

const DrawerItems = props => {
    return DrawerList.map((item, i) => {
        return(
            <DrawerLayout
                key={i}
                icon={item.icon}
                label={item.label}
                navigateTo={item.navigateTo}
            />
        );
    });
}

function DrawerCanevas(props){
    return(
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={StyleSheet.drawerContent}>
                    <TouchableOpacity activeOpacity={0.8}>
                        <View style={styles.userInfoSection}>
                            <View style={{flexDirection:'row', marginTop:15}}>
                                <View style={{marginLeft:10, flexDirection:'column'}}>
                                    <Text style={styles.title}>Nicolas Fleurent</Text>
                                    <Text style={styles.caption}>nico@gmail.com</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.drawerSection}>
                        <DrawerItems/>
                    </View>
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottomSection}>
                <DrawerItem 
                    icon={() =>{
                        return(
                            <Ionicons name="log-out" color="#092D74" size={30} style={styles.icons} />
                        );                        
                    }} 
                    label="Déconnexion"
                />
                <DrawerItem 
                    icon={() =>{
                        return(
                            <Ionicons name="trash" color="#fff" size={30} style={styles.icons} />
                        );                        
                    }} 
                    label="Suppression"
                    labelStyle={{
                        color:"#fff"
                    }}
                    style={{
                        backgroundColor:"red"
                    }}
                />
            </View>
        </View>
    )
}

export default DrawerCanevas;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5
    },
    title: {
      color:"#092D74",
      fontSize:24
    },
    caption: {
        color:"#092D74"
    },
    userInfoSection: {
      borderBottomColor:"#092D74",
      borderBottomWidth:5,
      paddingBottom:10
    },
    drawerSection: {
      
    },
    bottomSection:{
        
      borderTopColor:"#092D74",
      borderTopWidth:5,
      paddingTop:5
    },
    icons: {
        marginRight:-25,
    }
  });
  