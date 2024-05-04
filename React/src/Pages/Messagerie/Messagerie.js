import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
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
  const [initialConversations, setInitialConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredConversations = initialConversations.filter(
      (conversation) => {
        return (
          conversation.attributes.nom
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          conversation.attributes.prenom
            .toLowerCase()
            .includes(query.toLowerCase())
        );
      }
    );
    setConversations(filteredConversations);
  };

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
          setInitialConversations(response.data);
        })
        .catch((error) => console.log(error));
    });
  }, []);

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => navigation.navigate("Chat", { conversationId: item.id })}
    >
      <View>
        <Text style={styles.conversationName}>{item.attributes.prenom}</Text>
        <Text style={styles.conversationPrenom}>{item.attributes.nom}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color="#092D74" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Conversations</Text>
      <Text style={styles.sousTitre}>
        Communiquez avec vos enseignants et vos camarades.
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 5,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            borderRadius: 5,
            paddingVertical: 15,
            backgroundColor: "#E8ECF2",
            paddingLeft: 10,
          }}
          placeholder="Recherche..."
          value={searchQuery}
          onChangeText={(e) => handleSearch(e)}
        />
      </View>
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
    justifyContent: "center",
  },
  titre: {
    color: "#000",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },
  sousTitre: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 30,
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
  conversationPrenom: {
    fontSize: 12,
    marginTop: 8,
  },
});
