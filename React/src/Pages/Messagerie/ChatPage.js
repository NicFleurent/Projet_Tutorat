import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { showConversation } from "../../api/Messagerie/MessagerieApi";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { conversationId } = route.params;

  console.log(conversationId);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await showConversation(token, conversationId);
        const conversation = response.data;
        console.log(conversation);
        // Supposons que la réponse contient les détails de la conversation, y compris les messages
        // Assurez-vous de vérifier la structure de la réponse et d'extraire les messages selon la structure de votre API
        //setMessages(conversation.messages); // Supposons que les messages sont stockés dans un tableau messages dans la réponse
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la conversation:",
          error
        );
        // Gérer l'erreur de manière appropriée
      }
    };

    fetchConversation();
  }, []);

  const sendMessage = async () => {};

  const renderMessageItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.sender}>{item.from.prenom}</Text>
      <Text style={styles.message}>{item.attributes.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sender: {
    fontWeight: "bold",
    marginRight: 5,
  },
  message: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});

export default Chat;
