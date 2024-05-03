import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getConversations } from "../../api/Messagerie/MessagerieApi";
import * as SecureStore from "../../api/SecureStore";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function Messagerie() {
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    SecureStore.getValue("user_info").then((userInfo) => {
      setUser(JSON.parse(userInfo));

      userDemande = JSON.parse(userInfo);
      const headers = {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${userDemande.token}`,
      };
      axios
        .get(process.env.EXPO_PUBLIC_API_URL + "conversations", {
          headers: headers,
        })
        .then((response) => {
          setConversations(response.data);
        })
        .catch((error) => console.log(error));
    });
  }, []);

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => navigation.navigate("Chat", { conversationId: item.id })}
    >
      <Text style={styles.conversationName}>{item.attributes.prenom}</Text>
      <Ionicons name="chevron-forward-outline" size={24} color="#092D74" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sousTitre}>Conversations</Text>
      <FlatList
        data={conversations}
        renderItem={renderConversationItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  sousTitre: {
    color: "#092D74",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  conversationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  conversationName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
