import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SelectList } from 'react-native-dropdown-select-list';
import { Ionicons } from '@expo/vector-icons';
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

    const handleProposerService = function () {
        const headers = {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
        };

        const data = {
            tuteur_id: 1,
            cours_id: selectedCours,
        };

        axios
            .post(process.env.EXPO_PUBLIC_API_URL + 'cours/storeTuteur', data, {
                headers: headers,
            })
            .then((response) => {
                Alert.alert(response.data.message);
            })
            .catch((error) => {
                Alert.alert(error.response.data.message);
            });
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
            <Text style={styles.titrePage}>Demande</Text>

            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <Text style={styles.titre}>Offrir de l'aide?</Text>
                <Text style={styles.description}>Sélectionner le programme et le cours pour lequel vous voulez avoir de l'aide.</Text>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.section}>
                        <Text style={styles.titreSection}>Cours</Text>

                        <SelectList setSelected={(val) => setSelectedCours(val)} data={dataCours} save="key" placeholder="Choisir un cours" searchPlaceholder="Rechercher" />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

           
                <CustomButton text={'Voir les disponibilités'}  onPress={handleProposerService} />
          
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    backIcon: {
        marginTop: 20,
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
    titrePage: {
        fontSize: 32,
        marginTop: 30,
        fontWeight: 'bold',
        textAlign: 'left',
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
