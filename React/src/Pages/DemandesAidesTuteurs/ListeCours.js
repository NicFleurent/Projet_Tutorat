import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectList } from "react-native-dropdown-select-list";
import { useState, useEffect } from "react";
import CustomButton from "../../Components/CustomButton";
import axios from "axios";
import * as SecureStore from "../../api/SecureStore";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function ListeCours() {
  const navigation = useNavigation();
  const [selectedCours, setSelectedCours] = useState("");
  let [cours, setCours] = useState([]);
  let [programmes, setProgrammes] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.EXPO_PUBLIC_API_URL + "cours")
      .then((response) => setCours(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(process.env.EXPO_PUBLIC_API_URL + "programmes")
      .then((response) => setProgrammes(response.data))
      .catch((error) => console.log(error));
  }, []);

  let dataCours = [];
  programmes.map((programme) => {
    dataCours.push({
      key: programme.id,
      value:
        programme["attributes"].numero + " - " + programme["attributes"].nom,
      disabled: true,
    });
    cours.map((cours) => {
      if (cours["programme"].id === programme.id) {
        dataCours.push({
          key: cours.id,
          value: cours["attributes"].numero + " - " + cours["attributes"].nom,
        });
      }
    });
  });

  const handleProposerService = async function () {
    const headers = {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
    };

    const userInfo = JSON.parse(await SecureStore.getValue("user_info"));

    const data = {
      tuteur_id: userInfo.id,
      cours_id: selectedCours,
    };

    axios
      .post(process.env.EXPO_PUBLIC_API_URL + "cours/storeTuteur", data, {
        headers: headers,
      })
      .then((response) => {
        /*Toast.show({
                  type: "success",
                  text1: response.data.message
                });*/
        //Voir à ce passer un props et afficher le toast dans la page d'arriver.
        Alert.alert(response.data.message);
        navigation.navigate("PageDemande");
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: error.response.data.message,
        });
      });
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
          Sélectionner le programme et le cours pour lequel vous souhaitez
          proposer de l'aide.
        </Text>
        <Toast position="top" bottomOffset={20} />
        <ScrollView style={styles.scrollView}>
          <View>
            <Text style={styles.titreSection}>Cours</Text>

            <SelectList
              setSelected={(val) => setSelectedCours(val)}
              data={dataCours}
              save="key"
              placeholder="Choisir un cours"
              searchPlaceholder="Rechercher"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomButton
        text={"Proposer mes services"}
        halfButton={true}
        outlined={false}
        onPress={handleProposerService}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "start",
    padding: 10,
  },
  scrollView: {
    height: "85%",
  },
  titre: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  titrePage: {
    fontSize: 32,
    marginTop: 30,
    fontWeight: "bold",
    textAlign: "left",
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "left",
  },
  titreSection: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
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
