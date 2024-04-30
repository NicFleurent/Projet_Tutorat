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
import LoginCuate from "../../assets/svg/auth/Login-cuate.svg";
import CustomInput from "../../Components/CustomInput";
import { Ionicons } from "@expo/vector-icons";
import ClickableText from "../../Components/ClickableText";
import React, { useState, useEffect } from "react";
import { login } from "../../api/Auth/User";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "../../api/SecureStore";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError(null);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError(null);
  };

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError("Veuillez entrer votre adresse e-mail.");

      return false;
    }
    if (regex.test(email) == false) {
      setEmailError("Entrer une adresse avec un format valide.");

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

  const handleLoginPress = async () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    try {
      if (isEmailValid && isPasswordValid) {
        setIsLoading(true);
        const response = await login(email, password);

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
        text1: error.message,
        text2: "Email ou mot de passe incorrect",
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

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <View>
            <Text style={styles.titre}>De retour ?</Text>
            <Text style={styles.sousTitre}>
              Heureux de vous revoir parmis nous 😊 !
            </Text>
          </View>

          <View style={styles.image}>
            <LoginCuate width={280} height={280}></LoginCuate>
          </View>

          <View>
            {isLoading && <ActivityIndicator size="large" color="#092D74" />}
          </View>

          <View style={styles.formulaire}>
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

            <ClickableText
              textStyle={styles.forgetPassword}
              text={"Mot de passe oublier ?"}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "ResetPassword" }],
                })
              }
            ></ClickableText>
          </View>

          <View style={styles.butonView}>
            <CustomButton text={"Se connecter"} onPress={handleLoginPress} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast position="top" bottomOffset={20} />
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
    marginTop: 20,
  },
  sousTitre: {
    fontSize: 12,
    color: "#000",
  },
  formulaire: {
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
  image: {
    alignItems: "center",
    marginTop: 10,
  },
  forgetPassword: {
    textAlign: "right",
    color: "#092D74",
    fontSize: 15,
    fontWeight: "500",
    marginVertical: 10,
  },
});
