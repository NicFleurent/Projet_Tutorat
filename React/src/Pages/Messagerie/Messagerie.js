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

export default function Messagerie() {
  const navigation = useNavigation();
  const [conversations, setConversations] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    SecureStore.getValue("user_info").then((userInfoJson) => {
      const userInfo = JSON.parse(userInfoJson);

      if (userInfo != null) {
        console.log(userInfo);
        setToken(userInfo.token);
      }
    });

    const fetchData = async () => {
      if (token) {
        try {
          const response = await getConversations(token);
          setConversations(response.data);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des conversations:",
            error
          );
        }
      } else {
        console.warn("Token non trouvé.");
      }
    };

    fetchData();
  }, []);

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => navigation.navigate("chat", { conversationId: item.id })}
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
