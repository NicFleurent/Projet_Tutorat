import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

export default function CustomButton({
  text,
  onPress,
  outlined,
  halfButton,
  standartTextColor,
  outlinedTextColor,
  standartBackgroundColor,
  outlinedBackgroundColor,
  outlinedBorderColor,
}) {
  if (standartTextColor == null) {
    standartTextColor = "#fff";
  }
  if (outlinedTextColor == null) {
    outlinedTextColor = "#092D74";
  }
  if (standartBackgroundColor == null) {
    standartBackgroundColor = "#092D74";
  }
  if (outlinedBackgroundColor == null) {
    outlinedBackgroundColor = "transparent";
  }
  if (outlinedBorderColor == null) {
    outlinedBorderColor = "#092D74";
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.none, halfButton && styles.button]}
    >
      <View
        style={[
          styles.buttonContainer,
          outlined && styles.outlinedButtonContainer,
          {
            backgroundColor: outlined
              ? outlinedBackgroundColor
              : standartBackgroundColor,
          },
          {
            borderColor: outlined && outlinedBorderColor,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            outlined && styles.outlinedText,
            { color: outlined ? outlinedTextColor : standartTextColor },
          ]}
        >
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
    borderRadius: 8,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  outlinedButtonContainer: {
    paddingVertical: 13,
    borderWidth: 2,
  },
  outlinedText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
