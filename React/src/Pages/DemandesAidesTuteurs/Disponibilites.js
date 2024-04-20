import { StyleSheet, View, Text, Image } from "react-native";
import ParametreOption from "../../Components/ParametreOption";

export default function Disponibilites() {
  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Disponibilités</Text>
      <Text style={styles.sousTitre}>
        Veuillez choisir vos disponibilités
      </Text>
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
    marginTop: 10,
  },
  parameterView: {
    marginTop: 45,
  },
  parameterViewTest: {
    marginTop: 30,
  },
});
