import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const jourSemaine = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'];

const DATA = [
    {
        id: '1',
        title: 'Première dispo',
    },
    {
        id: '2',
        title: 'Deuxième dispo',
    },
    {
        id: '3',
        title: 'Troisième dispo',
    },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
    </TouchableOpacity>
);

export default function Calendrier({route}) {
    const {idCours} = route.params;
    const navigation = useNavigation();
    const [selectedId, setSelectedId] = useState();
    const [selectedButton, setSelectedButton] = useState();

    const handleButtonPress = (jour) => {
        setSelectedButton(jour);
    };

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
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
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
            />
            
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
