import { Text, TouchableHighlight } from "react-native";

export default function Skip({
  text,
  onPress,
  underlayColor,
  activeOpacity,
  textStyle,
}) {
  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={activeOpacity}
      underlayColor={underlayColor}
    >
      <Text style={textStyle}>{text}</Text>
    </TouchableHighlight>
  );
}
