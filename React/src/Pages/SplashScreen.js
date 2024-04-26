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
      <Image source={require("../assets/img/logo_cegep.png")}></Image>
      <Text style={styles.titre}>Tuttor App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titre: {
    fontSize: 32,
    fontWeight: "600",
  },
});
