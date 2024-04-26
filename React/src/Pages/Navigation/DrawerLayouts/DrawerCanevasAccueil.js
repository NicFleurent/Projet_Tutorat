import React from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import * as SecureStore from "../../../api/SecureStore";
import * as UserApi from "../../../api/Auth/User";

const DrawerList = [
  { icon: "home", label: "Accueil", navigateTo: "Accueil" },
  {
    icon: "person-circle",
    label: "Modifier le compte",
    navigateTo: "Modification du compte",
  },
  {
    icon: "settings",
    label: "Changer le mot de passe",
    navigateTo: "Modification du mot de passe",
  },
];

const DrawerLayout = ({ icon, label, navigateTo }) => {
  const navigation = useNavigation();
  return (
    <DrawerItem
      icon={() => (
        <Ionicons name={icon} color="#092D74" size={20} style={styles.icons} />
      )}
      label={label}
      labelStyle={{ color: "#092D74" }}
      onPress={() => {
        navigation.navigate(navigateTo);
      }}
    />
  );
};

const DrawerItems = (props) => {
  return DrawerList.map((item, i) => {
    return (
      <DrawerLayout
        key={i}
        icon={item.icon}
        label={item.label}
        navigateTo={item.navigateTo}
      />
    );
  });
};

function DrawerCanevas(props) {
  const navigation = useNavigation();
  const [user, setUser] = useState([]);

  useEffect(() => {
    SecureStore.getValue("user_info").then((userInfo) => {
      setUser(JSON.parse(userInfo));
    });
  }, []);

  const handleDeletePress = async () => {
    try {
      //setIsLoading(true);
      const response = await UserApi.deleteAccount(user.token);

      SecureStore.deleteValue("user_info");

      //setIsLoading(false);

      navigation.reset({ index: 0, routes: [{ name: "AuthChoice" }] });
    } catch (error) {
      //setIsLoading(false);
      /*Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Erreur lors de la suppresion",
      });*/
      console.log(error.message);
    }
  };

  const deleteFirstOpenSecureKey = () => {
    SecureStore.deleteValue("first_open");

    navigation.reset({ index: 0, routes: [{ name: "AuthChoice" }] });
  };

  const deleteAccountAlert = () =>
    Alert.alert(
      "Attention",
      "Etes vous sure de vouloir supprimer votre compte ?",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => handleDeletePress() },
      ]
    );

  const handleLogoutPress = async () => {
    try {
      //setIsLoading(true);
      const response = await UserApi.logout(user.token);
      console.log(response);

      SecureStore.deleteValue("user_info");

      //setIsLoading(false);

      navigation.reset({ index: 0, routes: [{ name: "AuthChoice" }] });
    } catch (error) {
      //setIsLoading(false);
      /*Toast.show({
            type: "error",
            text1: "Erreur",
            text2: "Erreur lors de la deconnexion",
          });*/
      console.log(error.message);
    }
  };

  const logoutAlert = () =>
    Alert.alert("Attention", "Vous allez etre deconnecter", [
      {
        text: "Annuler",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => handleLogoutPress() },
    ]);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={StyleSheet.drawerContent}>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <View style={{ marginLeft: 10, flexDirection: "column" }}>
                  <Text style={styles.title}>
                    {user.prenom} {user.nom}
                  </Text>
                  <Text style={styles.caption}>{user.email}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.drawerSection}>
            <DrawerItems />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomSection}>
        <DrawerItem
          icon={() => {
            return (
              <Ionicons
                name="log-out"
                color="#092D74"
                size={30}
                style={styles.icons}
              />
            );
          }}
          label="Déconnexion"
          onPress={logoutAlert}
        />
        <DrawerItem
          icon={() => {
            return (
              <Ionicons
                name="trash"
                color="#fff"
                size={30}
                style={styles.icons}
              />
            );
          }}
          label="Suppression"
          onPress={deleteAccountAlert}
          labelStyle={{
            color: "#fff",
          }}
          style={{
            backgroundColor: "red",
          }}
        />

        <DrawerItem
          icon={() => {
            return (
              <Ionicons
                name="refresh-circle-outline"
                color="#fff"
                size={30}
                style={styles.icons}
              />
            );
          }}
          label="ResetKeySecureStore"
          onPress={deleteFirstOpenSecureKey}
          labelStyle={{
            color: "#fff",
          }}
          style={{
            backgroundColor: "red",
          }}
        />
      </View>
    </View>
  );
}

export default DrawerCanevas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  title: {
    color: "#092D74",
    fontSize: 24,
  },
  caption: {
    color: "#092D74",
  },
  userInfoSection: {
    borderBottomColor: "#092D74",
    borderBottomWidth: 5,
    paddingBottom: 10,
  },
  drawerSection: {},
  bottomSection: {
    borderTopColor: "#092D74",
    borderTopWidth: 5,
    paddingTop: 5,
  },
  icons: {
    marginRight: -25,
  },
});
