import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function Messagerie() {
  return (
    <View style={styles.container}>
      <Text style={styles.sousTitre}>
        Section à venir
      </Text>
      <Ionicons
        name={"construct"}
        color={"#092D74"}
        size={200}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    alignItems:'center',
    justifyContent:'center'
  },
  sousTitre: {
    color:'#092D74',
    fontSize: 65,
    fontWeight: "bold",
    marginTop: 10,
    textAlign:'center'
  },
});
