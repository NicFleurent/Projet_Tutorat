import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Alert, Platform } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../Components/CustomButton';
import axios from 'axios';

export default function ListeCours() {
    const [selectedCours, setSelectedCours] = useState('');
    const navigation = useNavigation();
    const [cours, setCours] = useState([]);
    const [programmes, setProgrammes] = useState([]);

    useEffect(() => {
        axios.get(process.env.EXPO_PUBLIC_API_URL + 'cours')
            .then((response) => setCours(response.data))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        axios.get(process.env.EXPO_PUBLIC_API_URL + 'programmes')
            .then((response) => setProgrammes(response.data))
            .catch((error) => console.log(error));
    }, []);

    let dataCours = [];
    programmes.map((programme) => {
        dataCours.push({ key: programme.id, value: programme['attributes'].numero + ' - ' + programme['attributes'].nom, disabled: true });
        cours.map((cours) => {
            if (cours['programme'].id === programme.id) {
                dataCours.push({ key: cours.id, value: cours['attributes'].numero + ' - ' + cours['attributes'].nom });
            }
        });
    });

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <Text style={styles.titre}>Avoir de l'aide ?</Text>
                <Text style={styles.description}>Sélectionner le cours pour lequel vous voulez avoir de l'aide.</Text>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.section}>
                        <Text style={styles.titreSection}>Cours</Text>
                        <SelectList 
                        setSelected={(val) => setSelectedCours(val)}
                        data={dataCours} 
                        save="key" 
                        placeholder="Choisir un cours" 
                        searchPlaceholder="Rechercher"
                        notFoundText="Aucun résultat trouvé" />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <CustomButton text={'Voir les disponibilités'} onPress={() => {
                navigation.navigate("Calendrier", {
                    idCours: selectedCours
                });
            }} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },
    scrollView: {
        flex: 1,
    },
    titre: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'left',
    },
    section: {
        marginBottom: 20,
    },
    titreSection: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 5,
    },

});
