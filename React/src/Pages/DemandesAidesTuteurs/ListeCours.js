import { StyleSheet, View, Text, Pressable } from "react-native";
import Aide from "../../assets/svg/DemandeAideTuteur/Student.svg";
import Tuteur from "../../assets/svg/DemandeAideTuteur/Teacher.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectList } from 'react-native-dropdown-select-list';
import { useState, useEffect } from "react";

export default function ListeCours() {
    const [selectedProgramme, setSelectedProgramme] = useState("");
    const [selectedCours, setSelectedCours] = useState("");
  
    const dataProgrammes = [
        {key:'1', value:'TEst', disabled:true},
        {key:'2', value:'Appliances'},
        {key:'3', value:'Cameras'},
        {key:'4', value:'Computers', disabled:true},
        {key:'5', value:'Vegetables'},
        {key:'6', value:'Diary Products'},
        {key:'7', value:'Drinks'},
    ];
  
    const dataCours = [
        {key:'1', value:'Mobiles', disabled:true},
        {key:'2', value:'Appliances'},
        {key:'3', value:'Cameras'},
        {key:'4', value:'Computers', disabled:true},
        {key:'5', value:'Vegetables'},
        {key:'6', value:'Diary Products'},
        {key:'7', value:'Drinks'},
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titre}>Choisir un cour</Text>

            <View style={styles.section}>
                <Text style={styles.titreSection}>Liste Programmes</Text>
                <SelectList 
                    setSelected={(val) => setSelectedProgramme(val)} 
                    data={dataProgrammes} 
                    save="value"
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.titreSection}>Liste Cours</Text>
                <SelectList 
                    setSelected={(val) => setSelectedCours(val)} 
                    data={dataCours} 
                    save="value"
                />
            </View>
            

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "start",
    },
    titre: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
    },
    section: {
        margin: 20,
    },
    titreSection: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
    },
});