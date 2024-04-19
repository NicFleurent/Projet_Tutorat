import { StyleSheet, View, Text, Image } from "react-native";
import ParametreOption from "../../Components/ParametreOption";

export default function Parametre() {
  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Paramètres</Text>
      <Text style={styles.sousTitre}>
        Personnalisez votre expérience avec des réglages adaptés à vos besoins
      </Text>

      <View style={styles.parameterView}>
        <ParametreOption
          underlayColor={"092D74"}
          onPress={() => {}}
          nomIcon={"person-outline"}
          titre={"Informations sur le compte"}
          sousTitre={"Accedez et modifier vos informations personelles"}
        />

        <View style={styles.parameterViewTest}></View>

        <ParametreOption
          underlayColor={"092D74"}
          onPress={() => {}}
          color={"#CF152D"}
          nomIcon={"log-out-outline"}
          titre={"Deconnexion"}
          sousTitre={"Se déconnecter de l'application"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  titre: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 100,
  },
  sousTitre: {
    fontSize: 12,
    paddingRight: 40,
    marginTop: 10,
  },
  parameterView: {
    marginTop: 45,
  },
  parameterViewTest: {
    marginTop: 30,
  },
});
