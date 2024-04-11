import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../Components/CustomButton";
import LeftIcon from "../../assets/svg/icons/Left 1.svg";
import Triangle from "../../assets/svg/auth/Traingle.svg";
import CustomInput from "../../Components/CustomInput";

export default function Register() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backIcon}>
        <LeftIcon width={35} height={35}></LeftIcon>
      </View>

      <View style={styles.headPage}>
        <View>
          <Text style={styles.titre}>Enregistrez vous</Text>
          <Text style={styles.sousTitre}>
            Hate de commencer a collaborer avec vous
          </Text>
        </View>
        <Triangle width={141} height={139}></Triangle>
      </View>

      <CustomInput placeholder={"John"} isPassword={false}></CustomInput>
      <View style={styles.butonView}>
        <CustomButton text={"S’enregistrer"}></CustomButton>
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
  backIcon: {
    marginTop: 20,
  },
  butonView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  titre: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 16,
  },
  sousTitre: {
    fontSize: 12,
    color: "#000",
  },
  headPage: {
    flex: 1,
    flexDirection: "row",
  },
});
