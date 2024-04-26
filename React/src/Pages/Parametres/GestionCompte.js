import { StyleSheet, View, Text, ActivityIndicator, Alert } from "react-native";
import CustomInput from "../../Components/CustomInput";
import React, { useState, useEffect } from "react";
import CustomButton from "../../Components/CustomButton";
import * as SecureStore from "../../api/SecureStore";
import * as UserApi from "../../api/Auth/User";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

export default function GestionCompte() {
  const navigation = useNavigation();
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState(null);
  const [nomError, setNomError] = useState(null);
  const [prenomError, setPrenomError] = useState(null);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const userInfo = JSON.parse(await SecureStore.getValue("user_info"));

    if (userInfo != null) {
      setId(userInfo.id);
      setNom(userInfo.nom);
      setPrenom(userInfo.prenom);
      setEmail(userInfo.email);
      setToken(userInfo.token);
    }
  };

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

  const validateNom = () => {
    if (!nom) {
      setNomError("Veuillez entrer votre nom.");
      return false;
    }
    return true;
  };

  const validatePrenom = () => {
    if (!prenom) {
      setPrenomError("Veuillez entrer votre prenom.");
      return false;
    }
    return true;
  };

  const handleUpdatePress = async () => {
    const isEmailValid = validateEmail();
    const isNomValid = validateNom();
    const isPrenomValid = validatePrenom();

    try {
      if (isEmailValid && isNomValid && isPrenomValid) {
        setIsLoading(true);
        const response = await UserApi.edit(email, nom, prenom, id);

        const userInfo = {
          token: token,
          id: id,
          email: email,
          nom: nom,
          prenom: prenom,
        };

        SecureStore.save("user_info", userInfo);

        setIsLoading(false);
        Toast.show({
          type: "success",
          text1: "Effectuer",
          text2: "Modification effectuer avec suceess",
        });
      }
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Erreur lors de l'operation",
      });
      console.log(error.message);
    }
  };

  const handleLogoutPress = async () => {
    try {
      setIsLoading(true);
      const response = await UserApi.logout(token);

      const userInfo = {
        token: "",
        id: "",
        email: "",
        nom: "",
        prenom: "",
      };

      SecureStore.save("user_info", userInfo);

      setIsLoading(false);

      navigation.reset({ index: 0, routes: [{ name: "AuthChoice" }] });
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Erreur lors de la deconnexion",
      });
      console.log(error.message);
    }
  };

  const handleDeletePress = async () => {
    try {
      setIsLoading(true);
      const response = await UserApi.deleteAccount(token);

      const userInfo = {
        token: "",
        id: "",
        email: "",
        nom: "",
        prenom: "",
      };

      SecureStore.save("user_info", userInfo);

      setIsLoading(false);

      navigation.reset({ index: 0, routes: [{ name: "AuthChoice" }] });
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Erreur lors de la suppresion",
      });
      console.log(error.message);
    }
  };

  const logoutAlert = () =>
    Alert.alert("Attention", "Vous allez être deconnecté", [
      {
        text: "Annuler",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => handleLogoutPress() },
    ]);

  const deleteAccountAlert = () =>
    Alert.alert(
      "Attention",
      "Êtes vous certain de vouloir supprimer votre compte ?",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => navigation.navigate("ResetPassword") },
      ]
    );

  return (
    <View style={styles.container}>
      <Toast position="top" bottomOffset={20} />
      <Text style={styles.titre}>Mon Compte</Text>
      <Text style={styles.sousTitre}>
        Modifier les informations de votre compte en toute simplicité
      </Text>

      <View style={styles.formulaire}>
        <View>
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

          <View>
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

          <View>
            <Text style={styles.label}>Prenom</Text>

            <CustomInput
              placeholder={"Prenom"}
              onChangeText={handlePrenomChange}
              value={prenom}
            />
            {prenomError == null ? (
              <Text> </Text>
            ) : (
              <Text style={{ color: "red", marginTop: 5 }}>{prenomError}</Text>
            )}
          </View>
        </View>

        <View>
          {isLoading && <ActivityIndicator size="large" color="#092D74" />}
        </View>

        <View style={styles.viewHalfButton}>
          <CustomButton text={"Modifier"} onPress={() => handleUpdatePress()} />
        </View>
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
    marginTop: 30,
  },
  sousTitre: {
    fontSize: 12,
    marginTop: 10,
  },
  formulaire: {
    flex: 1,
    marginTop: 60,
    justifyContent: "space-between",
  },
  label: {
    marginBottom: 10,
  },
  viewHalfButton: {
    marginBottom: 20,
  },
});
