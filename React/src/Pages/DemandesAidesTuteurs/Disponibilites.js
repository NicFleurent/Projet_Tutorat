import React, { useState } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, Platform  } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import SelectBox from 'react-native-multi-selectbox';
import { SelectList } from 'react-native-dropdown-select-list';
import { xorBy } from 'lodash';
import * as SecureStore from "../../api/SecureStore";
import axios from "axios";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CustomButton from '../../Components/CustomButton';

const jourSemaine = [
  'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'
];

const heures = [
  {
    item: '8:00',
    id: '1',
  },
  {
    item: '8:55',
    id: '2',
  },
  {
    item: '9:50',
    id: '3',
  },
  {
    item: '10:45',
    id: '4',
  },
  {
    item: '12:10',
    id: '5',
  },
  {
    item: '13:05',
    id: '6',
  },
  {
    item: '14:00',
    id: '7',
  },
  {
    item: '15:05',
    id: '8',
  },
]

export default function Disponibilites() {
  const navigation = useNavigation();
  const [selectedJour, setSelectedJour] = useState([]);
  const [selectedHeure, setSelectedHeure] = useState([]);

  const handleMultiSelect = (item) => {
    const updatedSelectedHeure = xorBy(selectedHeure, [item], 'id');
    setSelectedHeure(updatedSelectedHeure);
  };

  const handleAjouterDisponibilites = async function () {
    if (selectedJour.length === 0 || selectedHeure.length === 0) {
      Toast.show({
        type: "error",
        text1: "Attention !",
        text1Style: { fontSize: 14 },
        text2: "Choisir une option pour chaque catégorie.",
        text2Style: { fontSize: 12 },
        swipeable: true,
        visibilityTime: 5000
      });
    }
    selectedHeure.forEach(async heure => {

      const headers = {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      }

      const userInfo = JSON.parse(await SecureStore.getValue('user_info'));

      const dataDispo = {
        journee: selectedJour,
        heure: heure.item,
        user_id: userInfo.id
      };
      try {
        const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + "disponibilites/upload", dataDispo, {
          headers: headers
        });
        navigation.navigate({
          name: 'Tutorat',
          params: { message: response.data.message },
          merge: true,
        });
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error.response.data.message
        });
      }
    });
  }

  return (
    <SafeAreaView style={styles.container}>
     <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text style={styles.titreSection}>Choisir le jour</Text>
        <SelectList
          setSelected={(val) => setSelectedJour(val)}
          data={jourSemaine}
          save="key"
          placeholder="Choisir"
          searchPlaceholder="Rechercher"
          search={false}
        />
   

      <View style={styles.viewCont}>
        <Text style={styles.titreSection}>Choisir les heures</Text>
        <SelectBox
          label="Choisir une ou plusieurs heures"
          options={heures}
          inputPlaceholder='Heures'
          listEmptyText='Aucun résultat trouvé'
          selectedValues={selectedHeure}
          onMultiSelect={handleMultiSelect}
          onTapClose={handleMultiSelect}
          multiOptionContainerStyle={{ backgroundColor: '#092D74' }}
          selectedItemStyle={{ backgroundcolor: 'black' }}
          toggleIconColor='black'
          arrowIconColor='black'
          isMulti
        />
      </View>
      </KeyboardAvoidingView>
      <CustomButton
        text={'Ajouter'}
        onPress={handleAjouterDisponibilites}
      />
      <Toast position="top" bottomOffset={20} />
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  viewCont: {
    marginTop: 20,
  },
  titreSection: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    paddingBottom: 5
  },
});