import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ResolveProblems from "../../assets/svg/problem-solving-5-71.svg";
import EllipseBlue from "../../assets/svg/EllipseBlue.svg";
import EllipseGray from "../../assets/svg/EllipseGray.svg";
import CustomButton from "../../Components/CustomButton";

export default function Onboarding01() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity>
          <Text style={styles.skip}>Passer</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.image}>
        <ResolveProblems width={372} height={372}></ResolveProblems>
      </View>

      <Text style={styles.titre}>Trouver un tuteur de façon simple</Text>

      <Text style={styles.sousTitre}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor
      </Text>

      <View style={styles.ellipses}>
        <EllipseBlue style={{ marginRight: 10 }}></EllipseBlue>
        <EllipseGray style={{ marginRight: 10 }}></EllipseGray>
        <EllipseGray></EllipseGray>
      </View>
      <View  style={styles.buttonView}></View>
      <CustomButton  text={"Suivant"}></CustomButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  skip: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 20,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  image: {
    alignItems: "center",
  },
  titre: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  sousTitre: {
    fontSize: 16,
    textAlign: "center",
    color: "#7B868B",
    marginTop: 30,
  },
  ellipses: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buttonView:{
    flex: 1,
    paddingBottom: 60,
  }
});
