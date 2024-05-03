import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import * as SecureStore from "../../api/SecureStore";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute();
  const [messagesLength, setMessagesLength] = useState(0);
  const { conversationId } = route.params;

  useEffect(() => {
    SecureStore.getValue("user_info").then((userInfo) => {
      setUser(JSON.parse(userInfo));
      userDemande = JSON.parse(userInfo);

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDemande.token}`,
      };

      axios
        .get(
          process.env.EXPO_PUBLIC_API_URL +
            "conversation/show/" +
            conversationId,
          {
            headers: headers,
          }
        )
        .then((response) => {
          console.log(response.data);

          setMessages(response.data);
          setMessagesLength(response.data.length);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    SecureStore.getValue("user_info").then((userInfo) => {
      setUser(JSON.parse(userInfo));
      userDemande = JSON.parse(userInfo);

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDemande.token}`,
      };

      axios
        .get(
          process.env.EXPO_PUBLIC_API_URL +
            "conversation/show/" +
            conversationId,
          {
            headers: headers,
          }
        )
        .then((response) => {
          console.log(response.data);

          setMessages(response.data);
          setLoading(false);
          setRefreshing(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    });
  };

  const sendMessage = async (messageContent) => {
    try {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      };

      const messageData = {
        content: messageContent,
      };

      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}conversation/store/${conversationId}`,
        messageData,
        {
          headers: headers,
        }
      );

      console.log("Message envoyé avec succès:", response.data);

      const newMessage = response.data;
      setMessages([...messages, newMessage]);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    }
  };

  const renderMessageItem = ({ item }) => {
    const isCurrentUser = item.from.id == user.id;
    const messageStyle = isCurrentUser
      ? styles.sentMessage
      : styles.receivedMessage;

    const messageAlignment = isCurrentUser ? "flex-end" : "flex-start";

    return (
      <View
        style={[styles.messageContainer, { justifyContent: messageAlignment }]}
      >
        <View style={[messageStyle, styles.messageBubble]}>
          <Text style={styles.messageText}>{item.attributes.content}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Ajustez la hauteur du clavier ici
    >
      <View style={styles.container}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={messages}
            renderItem={renderMessageItem}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            initialScrollIndex={messages.length - 1}
            onScrollToIndexFailed={(info) => {
              const wait = new Promise((resolve) => setTimeout(resolve, 500));
              wait.then(() => {
                listRef.current?.scrollToIndex({
                  index: info.index,
                  animated: true,
                });
              });
            }}
          />
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message..."
          />
          <Button title="Send" onPress={() => sendMessage(newMessage)} />
        </View>
      </View>
    </KeyboardAvoidingView>
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

  sentMessage: {
    backgroundColor: "#DCF8C5",
  },
  receivedMessage: {
    backgroundColor: "#FFFFFF",
  },
  messageBubble: {
    borderRadius: 10,
    maxWidth: "80%",
    padding: 10,
    marginVertical: 5,
  },
  messageText: {
    fontSize: 16,
  },
});

export default Chat;
