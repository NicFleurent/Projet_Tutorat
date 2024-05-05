import { Alert, StyleSheet, View, Text, Platform, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
//import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState } from "react";
import CustomButton from "../../Components/CustomButton";
import * as SecureStore from "../../api/SecureStore";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function ModificationRencontre({ route }) {
  const navigation = useNavigation();
  const idRencontre = route.params.idRencontre;


  const heure = route.params.heure;
  const [heureSeparee, minutesSeparees] = heure.split(':');

  const dateRencontre = route.params.date;
  const dateParts = dateRencontre.split(' ');
  const jour = parseInt(dateParts[0]);
  const mois = convertirMoisEnNumero(dateParts[1]);
  const annee = parseInt(dateParts[2]);

  function convertirMoisEnNumero(mois) {
    const moisEnNumero = {
      "janvier": 0, "février": 1, "mars": 2, "avril": 3,
      "mai": 4, "juin": 5, "juillet": 6, "août": 7,
      "septembre": 8, "octobre": 9, "novembre": 10, "décembre": 11
    };
    return moisEnNumero[mois];
  }

  function convertirNumeroEnMois(numero) {
    const numeroEnMois = {
      0: "janvier", 1: "février",  2:"mars", 3: "avril",
      4: "mai", 5: "juin", 6: "juillet", 7: "août",
      8: "septembre", 9: "octobre", 10: "novembre", 11:"décembre" 
    };
    return numeroEnMois[numero];
  }

  const [date, setDate] = useState(new Date(annee, mois, jour, heureSeparee, minutesSeparees));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Aucune date entrée pour le moment');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.Os === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + ' ' + (convertirNumeroEnMois(tempDate.getMonth())) + ' ' + tempDate.getFullYear();
    let fTime = String(tempDate.getHours()).padStart(2, '0') + ':' + String(tempDate.getMinutes()).padStart(2, '0');
    setText(fDate + ' à ' + fTime)
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }


  const handleModifier = async () => {
    if (date.getHours() < 8 || (date.getHours() >= 15 && date.getMinutes() >= 5)) {
      Toast.show({
        type: "error",
        text1: "Heure invalide",
        text1Style: { fontSize: 13 },
        text2: "Veuillez choisir une heure entre 8:00 et 15:05.",
        text2Style: { fontSize: 12 },
        visibilityTime: 3000,
      });
      return;
    }
    else if (date.getDay() === 0 || date.getDay() === 6) { 
      Toast.show({
        type: "error",
        text1: "Jour invalide",
        text1Style: { fontSize: 13 },
        text2: "Veuillez choisir une date entre lundi et vendredi.",
        text2Style: { fontSize: 11 },
        visibilityTime: 3000,
      });
      return;
    }
    try {
      const userInfo = JSON.parse(await SecureStore.getValue('user_info'));

      const headers = {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${userInfo.token}`,
      };

      const data = {
        date: date.toLocaleDateString(),
        heure: `${date.getHours()}:${date.getMinutes()}`
      };

      Alert.alert(
        "Êtes-vous certain de vouloir modifier ?",
        "",
        [
          {
            text: "Annuler",
            style: "cancel"
          },
          {
            text: "Oui",
            onPress: async () => {
              const response = await axios.put(process.env.EXPO_PUBLIC_API_URL + 'rencontres/modifierRencontre/' + idRencontre, data, {
                headers: headers
              });
              navigation.reset({
                index: 0,
                routes: [{ name: 'Accueil', params: { message: response.data.message } }]
              });
            }
          }
        ]
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titre}>Modification</Text>
        <Text style={styles.sousTitre}>Choisir un nouveau moment pour la rencontre :</Text>
        <View style={styles.sectionBouton}>
          <CustomButton
            text={' Choisir la journée '}
            onPress={() => showMode('date')}
          />
          <CustomButton
            text={' Choisir l\'heure '}
            onPress={() => showMode('time')}
          />
        </View>

        {show && (
          <DateTimePicker
            value={date}
            minimumDate={new Date()}
            mode={mode}
            is24Hour={true}
            local='fr'
            display="spinner"
            onChange={onChange}

          />
        )}

        <Text style={styles.titre}>Nouvelle date :</Text>
        <Text style={styles.date}>{text}</Text>
      </View>

      <CustomButton
        text={'Modifier'}
        onPress={handleModifier}
      />
      <Toast position="top" bottomOffset={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    justifyContent: 'space-between'
  },
  titre: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 20
},
  sousTitre: {
    fontSize: 16,
    marginBottom: 25,
  },
  sectionBouton:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  date:{
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20
  }
});
