import { Text, TouchableHighlight, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ParametreOption({
  titre,
  sousTitre,
  nomIcon,
  onPress,
  underlayColor,
  activeOpacity,
  color,
}) {
  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={activeOpacity}
      underlayColor={underlayColor}
    >
      <View style={styles.parameterView}>
        <Ionicons name={nomIcon} style={styles.icon} size={35} color={color} />
        <View>
          <Text style={[styles.parameterViewTitre, { color: color }]}>
            {titre}
          </Text>
          <Text style={[styles.parameterViewSousTitre, { color: color }]}>
            {sousTitre}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 15,
  },
  parameterView: {
    flexDirection: "row",
    alignItems: "center",
  },
  parameterViewTitre: {
    fontWeight: "bold",
    fontSize: 16,
  },
  parameterViewSousTitre: {
    marginTop: 6,
    fontSize: 12,
  },
});
