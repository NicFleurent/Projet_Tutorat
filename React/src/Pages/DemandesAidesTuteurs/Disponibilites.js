import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from "../../Components/CustomButton";


const MonComposant = () => {
  const joursDeLaSemaine = [
    { title: 'Lundi' },
    { title: 'Mardi' },
    { title: 'Mercredi' },
    { title: 'Jeudi' },
    { title: 'Vendredi' }
  ];

  const heure = [
    { key: '1', value: '8:00' },
    { key: '2', value: '8:55' },
    { key: '3', value: '9:50' },
    { key: '4', value: '10:45' },
    { key: '5', value: '12:10' },
    { key: '6', value: '13:05' },
    { key: '7', value: '14:00' },
    { key: '7', value: '15:05' },
  ]

  const [selected, setSelected] = React.useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titre}>Disponibilités</Text>
      <SelectDropdown
        data={joursDeLaSemaine}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.title) || 'Sélectionnez une journée'}
              </Text>
              <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      
      <MultipleSelectList
        setSelected={(val) => setSelected(val)}
        data={heure}
        save="value"
        label='Heures'
        search={false}
        placeholder='Sélectionner les heures'
        boxStyles={styles.dropdownButtonStyle}
        inputStyles={styles.dropdownItemTxtStyle}
        

      />
     
      <CustomButton
        text={"Ajouter"}
        halfButton={true}
        outlined={false}

      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'start',
    alignItems: 'center'
  },
  titre: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 50,
  },
  dropdownButtonStyle: {
    width: '75%',
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 25,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownContainerStyle: {
    width: '75%',
    marginTop: 50,
  },
  
});

export default MonComposant;
