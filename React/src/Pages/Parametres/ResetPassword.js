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
import ResetPasswordImage from "../../assets/svg/auth/Reset password-cuate.svg";
import CustomInput from "../../Components/CustomInput";
import { Ionicons } from "@expo/vector-icons";
import ClickableText from "../../Components/ClickableText";
import React, { useState, useEffect } from "react";
import { login, updatePassword } from "../../api/Auth/User";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "../../api/SecureStore";

export default function ResetPassword() {
  const navigation = useNavigation();

  const [token, setToken] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState(null);
  const [newPasswordError, setNewPasswordError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleOldPasswordChange = (text) => {
    setOldPassword(text);
    setOldPasswordError(null);
  };

  const handleNewPasswordChange = (text) => {
    setNewPassword(text);
    setNewPasswordError(null);
  };

  const validateOldPassword = () => {
    if (!oldPassword) {
      setOldPasswordError("Veuillez entrer votre mot de passe.");
      return false;
    }
    return true;
  };

  const validateNewPassword = () => {
    if (!newPassword) {
      setNewPasswordError("Veuillez entrer votre mot de passe.");
      return false;
    }
    return true;
  };

  const getCurrentUser = async () => {
    const userInfo = JSON.parse(await SecureStore.getValue("user_info"));

    if (userInfo != null) {
      setToken(userInfo.token);
    }
  };

  const handleUpdatePasswordPress = async () => {
    const isOldPasswordValid = validateOldPassword();
    const isNewPasswordValid = validateNewPassword();

    try {
      if (isOldPasswordValid && isNewPasswordValid) {
        setIsLoading(true);
        const response = await updatePassword(oldPassword, newPassword, token);

        setIsLoading(false);
        Toast.show({
          type: "success",
          text1: response.message,
          text2: "Modification effectuer",
        });

        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "AuthChoice" }],
          });
        }, 3000);
      }
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: error.message,
        text2: "Modification échouée",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <View>
            <Text style={styles.titre}>Mettre à jour le mot de passe</Text>
            <Text style={styles.sousTitre}>
              Un problème de mémoire ou de sécurite ? Pas grave mettez à jour
              votre mot de passe.
            </Text>
          </View>

          <View style={styles.image}>
            <ResetPasswordImage width={290} height={290}></ResetPasswordImage>
          </View>

          <View>
            {isLoading && <ActivityIndicator size="large" color="#092D74" />}
          </View>

          <View style={styles.formulaire}>
            <View style={styles.labelAndInputSpace}>
              <Text style={styles.label}>Ancien mot de passe</Text>

              <CustomInput
                placeholder={"Mot de passe"}
                isPassword={true}
                onChangeText={handleOldPasswordChange}
                value={oldPassword}
              />
              {oldPasswordError == null ? (
                <Text> </Text>
              ) : (
                <Text style={{ color: "red", marginTop: 5 }}>
                  {oldPasswordError}
                </Text>
              )}
            </View>

            <View style={styles.labelAndInputSpace}>
              <Text style={styles.label}>Nouveau mot de passe</Text>

              <CustomInput
                placeholder={"Mot de passe"}
                isPassword={true}
                onChangeText={handleNewPasswordChange}
                value={newPassword}
              />
              {newPasswordError == null ? (
                <Text> </Text>
              ) : (
                <Text style={{ color: "red", marginTop: 5 }}>
                  {newPasswordError}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.butonView}>
            <CustomButton
              text={"Mettre à jour"}
              onPress={handleUpdatePasswordPress}
            />
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
