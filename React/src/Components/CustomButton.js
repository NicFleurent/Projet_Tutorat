import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

export default function CustomButton({ text, onPress, outlined, halfButton }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.none, halfButton && styles.button]}
    >
      <View
        style={[
          styles.buttonContainer,
          outlined && styles.outlinedButtonContainer,
        ]}
      >
        <Text style={[styles.text, outlined && styles.outlinedText]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  none: {},
  button: {
    flex: 1,
  },
  buttonContainer: {
    paddingVertical: 15,
    backgroundColor: "#092D74",
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  outlinedButtonContainer: {
    paddingVertical: 13,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#092D74",
  },
  outlinedText: {
    color: "#092D74",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
