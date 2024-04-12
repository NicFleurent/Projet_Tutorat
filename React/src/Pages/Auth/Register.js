import {
  StyleSheet,
  Platform,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Text,
} from "react-native";
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

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <View style={styles.headPage}>
            <View>
              <Text style={styles.titre}>Enregistrez vous</Text>
              <Text style={styles.sousTitre}>
                Hate de commencer a collaborer avec vous
              </Text>
            </View>
            <Triangle width={141} height={139}></Triangle>
          </View>

          <View style={styles.formulaire}>
            {/* Courriel */}

            <View>
              <Text style={styles.label}>Courriel</Text>

              <CustomInput placeholder={"Johndoe98@gmail.com"}></CustomInput>
            </View>

            <View style={styles.labelAndInputSpace}>
              <Text style={styles.label}>Nom</Text>

              <CustomInput placeholder={"John"}></CustomInput>
            </View>

            <View style={styles.labelAndInputSpace}>
              <Text style={styles.label}>Prenom</Text>

              <CustomInput placeholder={"Doe"}></CustomInput>
            </View>

            <View style={styles.labelAndInputSpace}>
              <Text style={styles.label}>Mot de passe</Text>

              <CustomInput
                placeholder={"Mot de passe"}
                isPassword={true}
              ></CustomInput>
            </View>

            <View style={styles.labelAndInputSpace}>
              <Text style={styles.label}>Confimer le mot de passe</Text>

              <CustomInput
                placeholder={"Mot de passe"}
                isPassword={true}
              ></CustomInput>
            </View>
          </View>

          <View style={styles.butonView}>
            <CustomButton text={"S’enregistrer"}></CustomButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginTop: 20,
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
    flexDirection: "row",
  },
  formulaire: {
    flex: 8,
    flexDirection: "column",
  },
  label: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "500",
  },
  labelAndInputSpace: {
    marginTop: 25,
  },
});
