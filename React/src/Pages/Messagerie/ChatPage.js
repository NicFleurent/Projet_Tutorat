import React, { useState, useEffect, useRef } from "react";
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
import { Ionicons } from "@expo/vector-icons";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute();
  const { conversationId } = route.params;
  const flatListRef = useRef(null);

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
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    });
  }, []);

  const scrollToTop = (isAnimated = false) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: isAnimated });
    }
  };

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
      setNewMessage("");
      setMessages([newMessage, ...messages]);
      scrollToTop(true);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      console.error(user.token);
      console.error(conversationId);
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
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.container}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={messages}
            ref={flatListRef}
            renderItem={renderMessageItem}
            keyExtractor={(item) => item.id.toString()}
            inverted={true}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Écrivez votre message..."
        />
        <Ionicons
          style={styles.refreshIcon}
          name={"refresh-outline"}
          size={32}
          color="#092D74"
          onPress={() => onRefresh()}
        />

        <Ionicons
          style={styles.sendIcon}
          name={"send-outline"}
          size={32}
          color="#092D74"
          onPress={() => sendMessage(newMessage)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#E8ECF2",
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
    justifyContent: "center",
  },
  input: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "#f0f0f0",
    marginLeft: 10,
  },

  sentMessage: {
    backgroundColor: "#A3B1CB",
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
  refreshIcon: {
    marginRight: 25,
  },
  sendIcon: {
    marginRight: 15,
  },
});

export default Chat;
