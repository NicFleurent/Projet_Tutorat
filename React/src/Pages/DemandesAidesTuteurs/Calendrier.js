import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


export default function Calendrier() {
    const navigation = useNavigation();
    
    const jourSemaine = [
        'Lun', 'Mar', 'Mer', 'Jeu', 'Ven'
    ];

    const [selectedButton, setSelectedButton] = useState();

    const handleButtonPress = (jour) => {
        console.log(jour);
        setSelectedButton(jour);
    };
    return (
        <SafeAreaView style={styles.container}>
            <Ionicons
                style={styles.backIcon}
                name={'arrow-back-outline'}
                size={24}
                color={'#000'}
                onPress={() => {
                    navigation.goBack();
                }}
            />
            <Text style={styles.titrePage}>Disponibilités</Text>
            <View style={styles.buttonLayout}>
                {jourSemaine.map((jour, index) => (
                    <TouchableOpacity
                        style={[
                            styles.buttonStyle,
                            selectedButton === jour && { backgroundColor: '#092D74' }, 
                        ]}
                        key={index}
                        onPress={() => handleButtonPress(jour)}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                selectedButton === jour && {
                                    color: 'white', 
                                },
                            ]}
                        >
                            {jour}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15
    },
    titrePage: {
        fontSize: 32,
        marginTop: 30,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    buttonLayout: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between'
    },
    buttonStyle: {
        width: 60,
        height: 60,
        backgroundColor: '#E8ECF2',
        borderRadius: 7,
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold'
    }
});

