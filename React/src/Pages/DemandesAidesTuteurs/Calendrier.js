import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from '../../Components/CustomButton';
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const jourSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

const Item = ({ item, onPress, backgroundColor, textColor }) => (

    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
        <View style={styles.textFlatlist}>
            <Text style={{ color: textColor }}>{'Nom : ' + item.tuteur.prenom}{item.tuteur.nom} </Text>
            <Text style={{ color: textColor }}>{'Heure : ' + item.attributes.heure}</Text>
        </View>
    </TouchableOpacity>

);

export default function Calendrier({ route }) {
    const navigation = useNavigation();
    const { idCours } = route.params;
    const [selectedJour, setSelectedJour] = useState();
    const [disponibilites, setDisponibilites] = useState([]);
    const [selectedId, setSelectedId] = useState();

    useEffect(() => {
        axios.get(`${process.env.EXPO_PUBLIC_API_URL}disponibilites/${idCours}`)
            .then((response) => setDisponibilites(response.data))
            .catch((error) => console.log(error))
    }, []);

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? '#092D74' : '#E8ECF2';
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
            <Text style={styles.titrePage}>Choisir la journée</Text>
            <View style={styles.buttonLayout}>
                {jourSemaine.map((jour, index) => (
                    <TouchableOpacity
                        style={[
                            styles.buttonStyle,
                            selectedJour === jour && { backgroundColor: '#092D74' },
                        ]}
                        key={index}
                        onPress={() => setSelectedJour(jour)}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                selectedJour === jour && {
                                    color: 'white',
                                },
                            ]}
                        >
                            {jour.slice(0, 3)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.titre}>Choisir un tuteur et heure</Text>
            <FlatList
                data={disponibilites.filter(dispo => dispo.attributes.journee === selectedJour)}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                extraData={selectedId}
            />

            <CustomButton text={'Envoyer la demande de tutorat'} onPress={() => {
                navigation.navigate("Accueil");
            }} />
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
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'left',
    },    
    titre: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop:10
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
        fontWeight: 'bold'
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 10,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    textFlatlist: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
