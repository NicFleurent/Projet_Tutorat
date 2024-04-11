import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";
import { useRef, useState } from "react";

export default function CustomInput({
  onPress,
  placeholder,
  onChangeText,
  error,
  isPassword,
  ...props
}) {
  const [text, setText] = useState("");
  const [showPassword, setShowPassword] = useState(props.secureTextEntry);
  return [(
    (
      <View>
        <TextInput
          style={styles.inputStandartStyle}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType="ascii-capable"
          {...props}
        />
      </View>
    ),
    isPassword && (
      <View>
        <TextInput
          style={styles.inputStandartStyle}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType="number"
          {...props}
        />
      </View>
    )
  )];
}

const styles = StyleSheet.create({
  inputStandartStyle: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  inputPasswordStyle: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
});
