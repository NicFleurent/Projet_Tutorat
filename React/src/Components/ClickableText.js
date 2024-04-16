import { Text, TouchableHighlight } from "react-native";

export default function ClickableText({
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
