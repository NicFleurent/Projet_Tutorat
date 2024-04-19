import { StyleSheet, View, Text, ScrollView, Pressable, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectList } from 'react-native-dropdown-select-list';
import { useState, useEffect } from "react";
import CustomButton from "../../Components/CustomButton";
import axios from "axios";

export default function ListeCours() {
    const [selectedCours, setSelectedCours] = useState("");
    let [cours, setCours] = useState([]);
    let [programmes, setProgrammes] = useState([]);

    
    const baseUrl = "http://127.0.0.1:8000/api";

    useEffect(() => {
        axios.get("https://6a21-204-48-92-213.ngrok-free.app/api/cours")
        .then((response) => setCours(response.data))
        .catch((error)=>console.log(error))
    }, []);

    useEffect(() => {
        axios.get("https://6a21-204-48-92-213.ngrok-free.app/api/programmes")
        .then((response) => setProgrammes(response.data))
        .catch((error)=>console.log(error))
    }, []);

    let dataCours = [];
    programmes.map((programme) => {
        dataCours.push({key:programme.id,value:programme['attributes'].numero + ' - ' + programme['attributes'].nom, disabled:true})
        cours.map((cours) => {
            if(cours['programme'].id === programme.id){
                dataCours.push({key:programme.id+'.'+cours.id,value:cours['attributes'].numero + ' - ' + cours['attributes'].nom})
            }
        })
    })

    return (
        <SafeAreaView style={styles.container}>
            
            <Text style={styles.titre}>Demande</Text>

            <KeyboardAvoidingView
                style={{ flex: 8 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                > 
            <Text style={styles.titrePage}>Offrir de l'aide?</Text>
            <Text style={styles.description}>
                Sélectionner le programme et le cours pour lequel 
                vous souhaitez proposer de l'aide.
            </Text>
            <ScrollView style={styles.scrollView}>

                <View style={styles.section}>
                    <Text style={styles.titreSection}>Cours</Text>
                    
                    <SelectList 
                        setSelected={(val) => setSelectedCours(val)} 
                        data={dataCours} 
                        save="value"
                        placeholder="Choisir un cours"
                        searchPlaceholder="Rechercher"
                    />
                </View>
            </ScrollView>  

            </KeyboardAvoidingView>

            
                <CustomButton
                    text={"Proposer mes services"}
                    halfButton={true}
                    outlined={true}
                />

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "start",
    },
    scrollView:{
        height: '85%'
    },
    titre: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
    },
    titrePage: {
        fontSize: 32,
        marginTop: 30,
        marginLeft: 10,
        fontWeight: "bold",
        textAlign: "left",
    },
    description: {
        fontSize: 14,
        marginHorizontal: 10,
        marginBottom: 10,
        textAlign: "left",
    },
    section: {
        margin: 10,
    },
    titreSection: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
});

/*
<SelectList 
                    setSelected={(val) => setSelectedProgramme(val)} 
                    data={dataProgrammes} 
                    save="value"
                />
                <Dropdown 
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataProgrammes}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Choisir un programme' : '...'}
                    searchPlaceholder="Rechercher un programme"
                    value={value}
                    //onFocus={() => setIsFocus(true)}
                    //onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        //setIsFocus(false);
                    }}
                />
*/