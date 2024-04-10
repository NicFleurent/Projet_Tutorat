import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ResolveProblems from "../../assets/svg/onboarding/problem-solving-5-71.svg";
import EllipseBlue from "../../assets/svg/onboarding/EllipseBlue.svg";
import EllipseGray from "../../assets/svg/onboarding/EllipseGray.svg";
import CustomButton from "../../Components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import Skip from "../../Components/Skip";

export default function Onboarding01() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Skip
          text={"Passer"}
          activeOpacity={0.6}
          textStyle={styles.skip}
          underlayColor={"092D74"}
          onPress={() => {
            navigation.navigate("AuthChoice");
          }}
        ></Skip>
      </View>
      <View style={styles.image}>
        <ResolveProblems width={372} height={372}></ResolveProblems>
      </View>

      <Text style={styles.titre}>
        Trouvez Votre Tuteur Idéal de façon simple
      </Text>

      <Text style={styles.sousTitre}>
        Rencontrez des tuteurs hautement qualifiés pour vous aider à exceller
        académiquement.
      </Text>

      <View style={styles.ellipses}>
        <EllipseBlue style={{ marginRight: 10 }}></EllipseBlue>
        <EllipseGray style={{ marginRight: 10 }}></EllipseGray>
        <EllipseGray></EllipseGray>
      </View>
      <View style={styles.butonView}>
        <CustomButton
          text={"Suivant"}
          onPress={() => navigation.navigate("Onboarding02")}
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
  butonView: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 20,
    justifyContent: "flex-end",
  },
});
