import { Alert, StyleSheet, View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
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

  const [date, setDate] = useState(new Date(annee, mois, jour, heureSeparee, minutesSeparees));


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

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
    else if (date.getDay() === 0 || date.getDay() === 6) { // 0 pour dimanche, 6 pour samedi
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

      const response = await axios.put(process.env.EXPO_PUBLIC_API_URL + 'rencontres/modifierRencontre/' + idRencontre, data, {
        headers: headers
      });

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
            onPress: () => {
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
        <DateTimePicker
          value={date}
          mode={"datetime"}
          display="spinner"
          is24Hour={true}
          minimumDate={new Date()}
          locale="fr"
          onChange={onChange}
        />
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
    marginBottom: 75,
  }
});
