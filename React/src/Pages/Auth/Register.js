import {
  StyleSheet,
  Platform,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Text,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../Components/CustomButton";
import Triangle from "../../assets/svg/auth/Traingle.svg";
import CustomInput from "../../Components/CustomInput";
import { Ionicons } from "@expo/vector-icons";
import { register } from "../../api/Auth/User";
import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "../../api/SecureStore";

export default function Register() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [nomError, setNomError] = useState(null);
  const [prenomError, setPrenomError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError(null);
  };

  const handleNomChange = (text) => {
    setNom(text);
    setNomError(null);
  };

  const handlePrenomChange = (text) => {
    setPrenom(text);
    setPrenomError(null);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError(null);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    setConfirmPasswordError(null);
  };

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError("Veuillez entrer votre courriel.");

      return false;
    }
    if (regex.test(email) == false) {
      setEmailError("Entrer une adresse avec un format valide.");

      return false;
    }
    return true;
  };

  const validateNom = () => {
    if (!nom) {
      setNomError("Veuillez entrer votre nom.");
      return false;
    }
    return true;
  };

  const validatePrenom = () => {
    if (!prenom) {
      setPrenomError("Veuillez entrer votre prénom.");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Veuillez entrer votre mot de passe.");
      return false;
    }
    return true;
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError("Veuillez entrer votre mot de passe.");
      return false;
    } else if (confirmPassword != password) {
      setConfirmPasswordError("Veuillez entrer des mots de passe identiques.");
      return false;
    }
    return true;
  };

  const handleRegisterPress = async () => {
    const isEmailValid = validateEmail();
    const isNomValid = validateNom();
    const isPrenomValid = validatePrenom();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    try {
      if (
        isEmailValid &&
        isNomValid &&
        isPrenomValid &&
        isPasswordValid &&
        isConfirmPasswordValid
      ) {
        setIsLoading(true);
        const response = await register(email, nom, prenom, password);
        const userInfo = {
          token: response.data.data.token,
          id: response.data.data.user.id,
          email: response.data.data.user.email,
          nom: response.data.data.user.nom,
          prenom: response.data.data.user.prenom,
          role: response.data.data.user.role,
        };
        SecureStore.save("user_info", userInfo);
        setIsLoading(false);

        navigation.reset({
          index: 0,
          routes: [{ name: "TabsNavigation" }],
        });
      }
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1:  error.message
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Ionicons
        style={styles.backIcon}
        name={"arrow-back-outline"}
        size={24}
        color="#000"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <Toast position="top" bottomOffset={20} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <View style={styles.headPage}>
            <View>
              <Text style={styles.titre}>Enregistrez vous</Text>
              <Text style={styles.sousTitre}>
                Hâte de commencer à collaborer avec vous
              </Text>
            </View>
            <Triangle width={141} height={139}></Triangle>
          </View>

          <View>
            {isLoading && <ActivityIndicator size="large" color="#092D74" />}
          </View>

          <View style={styles.formulaire}>
            {/* Courriel */}

            <View>
              <Text style={styles.label}>Courriel</Text>

              <CustomInput
                placeholder={"Johndoe98@gmail.com"}
                onChangeText={handleEmailChange}
                value={email}
              />
              {emailError == null ? (
                <Text> </Text>
              ) : (
                <Text style={{ color: "red", marginTop: 5 }}>{emailError}</Text>
              )}
            </View>

            <View style={styles.labelAndInputSpace}>
              <Text style={styles.label}>Nom</Text>

              <CustomInput
                placeholder={"John"}
                onChangeText={handleNomChange}
                value={nom}
              />
              {nomError == null ? (
                <Text> </Text>
              ) : (
                <Text style={{ color: "red", marginTop: 5 }}>{nomError}</Text>
              )}
            </View>

            <View style={styles.labelAndInputSpace}>
              <Text style={styles.label}>Prénom</Text>

              <CustomInput
                placeholder={"Doe"}
                onChangeText={handlePrenomChange}
                value={prenom}
              />
              {prenomError == null ? (
                <Text> </Text>
              ) : (
                <Text style={{ color: "red", marginTop: 5 }}>
                  {prenomError}
                </Text>
              )}
            </View>

            <View style={styles.labelAndInputSpace}>
              <Text style={styles.label}>Mot de passe</Text>

              <CustomInput
                placeholder={"Mot de passe"}
                isPassword={true}
                onChangeText={handlePasswordChange}
                value={password}
              />
              {passwordError == null ? (
                <Text> </Text>
              ) : (
                <Text style={{ color: "red", marginTop: 5 }}>
                  {passwordError}
                </Text>
              )}
            </View>

            <View style={styles.labelAndInputSpace}>
              <Text style={styles.label}>Confirmer le mot de passe</Text>

              <CustomInput
                placeholder={"Mot de passe"}
                isPassword={true}
                onChangeText={handleConfirmPasswordChange}
                value={confirmPassword}
              />
              {confirmPasswordError == null ? (
                <Text> </Text>
              ) : (
                <Text style={{ color: "red", marginTop: 5 }}>
                  {confirmPasswordError}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.butonView}>
            <CustomButton
              text={"S’enregistrer"}
              onPress={handleRegisterPress}
            ></CustomButton>
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
