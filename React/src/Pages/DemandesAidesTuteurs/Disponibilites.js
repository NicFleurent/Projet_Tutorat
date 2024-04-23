import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import SelectBox from 'react-native-multi-selectbox'
import { SelectList } from 'react-native-dropdown-select-list';
import { xorBy } from 'lodash'
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
  const [selectedJour, setSelectedJour] = useState([]);
  const [selectedHeure, setSelectedHeure] = useState([]);

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.titrePage}>Disponibilites</Text>
      <View style={styles.viewCont} >
        <Text style={styles.titreSection}>Choisir le jour</Text>
        <SelectList
          setSelected={(val) => setSelectedJour(val)}
          data={jourSemaine}
          save="key"
          placeholder="Choisir"
          searchPlaceholder="Rechercher"
        />
      </View>

      <View style={styles.viewCont}>
        <Text style={styles.titreSection}>Choisir les heures</Text>
        <SelectBox
          label=""
          options={heures}
          inputPlaceholder='Heures'
          listEmptyText='Aucun résultat trouvé'
          selectedValues={selectedHeure}
          onMultiSelect={onMultiChange()}
          onTapClose={onMultiChange()}
          multiOptionContainerStyle={{backgroundColor:'#DFCCE4'}}
          multiOptionsLabelStyle={{color:'black'}}
          //multiListEmptyLabelStyle={{padding:20}}
          listEmptyLabelStyle={{backgroundColor:'pink'}}
          selectedItemStyle={{backgroundcolor:'black'}}
          toggleIconColor= 'black'
          arrowIconColor= 'black'
        
          //multiSelectInputFieldProps={{backgroundColor:'black'}}
          //labelStyle={{color:'black'}}
          //containerStyle={{color:'black'}}
          //inputFilterContainerStyle={{color:'black'}}
          
          isMulti
        />
      </View>

      <CustomButton
        text={"Ajouter"}
        halfButton={true}
        outlined={false}
      />
    </SafeAreaView>
  )

  function onMultiChange() {
    return (item) => setSelectedHeure(xorBy(selectedHeure, [item], 'id'))
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  viewCont: {
    marginTop: 20
  },
  titrePage: {
    fontSize: 32,
    marginTop: 30,
    fontWeight: "bold",
    textAlign: "left",
  },
  titreSection: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
});