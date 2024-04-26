import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios"; // Importez axios

const jourSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

const Item = ({ item }) => (
    <View style={styles.item}>
        <Text>{item.tuteur.nom} {item.tuteur.prenom}</Text>
        <Text>{item.heure}</Text>
    </View>
);

export default function Calendrier({ route }) {
    const { idCours } = route.params;
    const [selectedJour, setSelectedJour] = useState();
    const [disponibilites, setDisponibilites] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}disponibilites/${idCours}`);
                setDisponibilites(response.data);
            } catch (error) {
                console.log('Erreur lors de la récupération des disponibilités:', error);
            }
        };
        if (selectedJour) {
            fetchData();
        }
    }, [selectedJour]);
console.log(disponibilites)
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titrePage}>Journée</Text>
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
                            {jour.slice(0,3)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <FlatList
                data={disponibilites}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.id.toString()}
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
        fontSize: 24,
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
        fontWeight: 'bold'
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#ccc'
    }
});
