import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const DrawerList = [
    {icon: 'home-outline', label: 'Accueil', navigateTo:'AccueilUtilisateur'},
    {icon: 'settings', label: 'Modifier mes informations', navigateTo:'GestionCompte'}
]

const DrawerLayout = ({icon, label, navigateTo}) => {
    const navigation = useNavigation();
    return(
        <DrawerItem
            icon={(color, size) => <Ionicons name={icon} color={color} size={size} />}
            label={label}
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
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={StyleSheet.drawerContent}>
                    <TouchableOpacity activeOpacity={0.8}>
                        <View style={styles.userInfoSection}>
                            <View style={{flexDirection:'row', marginTop:15}}>
                                <View style={{marginLeft:10, flexDirection:'column'}}>
                                    <Text style={styles.title}>Nico</Text>
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
        </View>
    )
}

export default DrawerCanevas;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingHorizontal: 10,
    },
    title: {
      
    },
    userInfoSection: {
      
    },
    drawerSection: {
      
    },
    caption: {
      
    },
  });
  