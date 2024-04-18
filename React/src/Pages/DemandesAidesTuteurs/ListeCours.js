import { StyleSheet, View, Text, ScrollView, Pressable, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectList } from 'react-native-dropdown-select-list';
import { Dropdown } from 'react-native-element-dropdown';
import { useState, useEffect } from "react";
import CustomButton from "../../Components/CustomButton";
//import { ScrollView } from "react-native-web";

export default function ListeCours() {
    const [selectedProgramme, setSelectedProgramme] = useState("");
    const [selectedCours, setSelectedCours] = useState("");
  
    let dataProgrammes = [
        {label:'1', value:'Mobiles'},
        {label:'2', value:'Appliances'},
        {label:'3', value:'Cameras'},
        {label:'4', value:'Computers'},
        {label:'5', value:'Vegetables'},
        {label:'6', value:'Diary Products'},
        {label:'7', value:'Drinks'},
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

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Dropdown label
          </Text>
        );
      }
      return null;
    };

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
                    <Text style={styles.titreSection}>Programme</Text>
                    <SelectList 
                        setSelected={(val) => setSelectedProgramme(val)} 
                        data={dataProgrammes} 
                        save="value"
                        placeholder="Choisir un programme"
                        searchPlaceholder="Rechercher"
                    />
                </View>

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