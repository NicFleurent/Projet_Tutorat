import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";
import { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function CustomInput({
  placeholder,
  onChangeText,
  error,
  isPassword,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTextChange = (text) => {
    setText(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <View>
      {isPassword ? (
        <View
          style={[
            styles.containerPasswordStyle,
            isFocused && styles.containerPasswordStyleOnFocus,
          ]}
        >
          <TextInput
            onChangeText={handleTextChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            value={text}
            textAlignVertical="center"
            secureTextEntry={showPassword}
            style={styles.inputPasswordStyle}
            {...props}
          />
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#aaa"
            style={styles.icon}
            onPress={toggleShowPassword}
          />
        </View>
      ) : (
        <TextInput
          style={[
            styles.inputStandardStyle,
            isFocused && styles.inputStandardStyleOnFocus,
          ]}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  containerPasswordStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  containerPasswordStyleOnFocus: {
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "space-between",
    height: 50,
    borderWidth: 2,
    borderColor: "#476297",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  inputStandardStyle: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  inputStandardStyleOnFocus: {
    height: 50,
    borderWidth: 2,
    borderColor: "#476297",
    padding: 10,
    borderRadius: 8,
  },
  errorText: {
    marginTop: 5,
    fontSize: 14,
    color: "red",
  },
  inputPasswordStyle: {
    flex: 1,
    paddingVertical: 10,
    marginRight: 10,
  },
});
