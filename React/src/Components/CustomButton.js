import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

export default function CustomButton({ text, onPress }) {
  return (
    <TouchableOpacity  onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 9,
    backgroundColor: "#092D74",
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
