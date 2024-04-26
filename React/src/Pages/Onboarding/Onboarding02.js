import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Decision from "../../assets/svg/onboarding/decision-77.svg";
import EllipseBlue from "../../assets/svg/onboarding/EllipseBlue.svg";
import EllipseGray from "../../assets/svg/onboarding/EllipseGray.svg";
import CustomButton from "../../Components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import ClickableText from "../../Components/ClickableText";

export default function Onboarding02() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <ClickableText
          text={"Passer"}
          activeOpacity={0.6}
          textStyle={styles.skip}
          underlayColor={"092D74"}
          onPress={() => {
            navigation.reset({ index: 0, routes: [{ name: "AuthChoice" }] });
          }}
        ></ClickableText>
      </View>
      <View style={styles.image}>
        <Decision width={372} height={372}></Decision>
      </View>

      <Text style={styles.titre}>Large Choix de tuteurs pour chaque Cours</Text>

      <Text style={styles.sousTitre}>
        Découvrez nos tuteurs, prêts à vous aider dans une large gamme de
        matières académiques.
      </Text>

      <View style={styles.ellipses}>
        <EllipseGray style={{ marginRight: 10 }}></EllipseGray>
        <EllipseBlue style={{ marginRight: 10 }}></EllipseBlue>
        <EllipseGray></EllipseGray>
      </View>
      <View style={styles.butonView}>
        <CustomButton
          text={"Suivant"}
          onPress={() => navigation.replace("Onboarding03")}
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
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});
