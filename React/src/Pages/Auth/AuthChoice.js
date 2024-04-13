import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MountainBiking from "../../assets/svg/auth/Mountain biking-cuate.svg";
import CustomButton from "../../Components/CustomButton";

export default function AuthChoice() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.image}>
        <MountainBiking width={372} height={372}></MountainBiking>
      </View>

      <Text style={styles.titre}>Votre Chemin vers la Réussite Débute Ici</Text>

      <Text style={styles.sousTitre}>
        Votre chemin vers l'excellence commence par une inscription ou une
        connection.
      </Text>
      <View style={styles.butonView}>
        <CustomButton text={"Connection"} halfButton={true}></CustomButton>

        <CustomButton
          text={"Inscription"}
          halfButton={true}
          outlined={true}
        ></CustomButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  image: {
    alignItems: "center",
    marginTop: 30,
  },
  titre: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 25,
  },
  sousTitre: {
    fontSize: 16,
    textAlign: "center",
    color: "#7B868B",
    marginTop: 30,
  },
  butonView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
  },
});