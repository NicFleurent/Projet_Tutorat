import { StyleSheet, View, Text, Image } from "react-native";
import { appRedirect } from "./SplashScreenLogic";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    appRedirect(navigation);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHaut}><Text> </Text></View>
      <View style={styles.sectionHaut}>
        <Text style={styles.titre}>Tutorat par les pairs</Text>
        <Image source={require("../assets/img/logo_cegep.png")}/>
      </View>
      <View style={styles.sectionBas}>
        <Text style={styles.realisePar}>Réalisé par :</Text>
        <Text style={styles.realiseParNom}>Nicolas Fleurent</Text>
        <Text style={styles.realiseParNom}>Alexander Greer</Text>
        <Text style={styles.realiseParNom}>Yousouf Esdras Manefa</Text>
        <Text style={styles.realiseParNom}>Mirolie Théroux</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  sectionHaut: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionBas: {
    flex:1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom:30
  },
  titre: {
    fontSize: 32,
    fontWeight: "600",
  },
  realisePar: {
    fontSize: 20,
    fontWeight: "600",
  },
  realiseParNom: {
    fontSize: 20,
  },
  logoInfo:{
    maxHeight:'10%',
    maxWidth:'95%'
  }
});
