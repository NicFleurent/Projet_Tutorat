import { StyleSheet, View, Text } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from '@react-navigation/native';

export default function FormulaireTuteurMatiere({route}) {
    const [matiereVu, setMatiereVu] = useState("aucune");
    const [rencontre_id, setRencontreId] = useState();

    const navigation = useNavigation();

    useEffect(() => {
      setRencontreId(route.params?.rencontre_id);
    }, [route.params?.rencontre_id]);

    const handleSoumettre = function(){
        navigation.navigate("Rencontres - Aidé", {
          rencontre_id: rencontre_id,
          matiereVu: matiereVu
        });
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.sousTitre}>
                    Quels sont les sujets que vous avez abordés pendant la rencontre?
                </Text>
                <TextInput 
                    style={styles.input} 
                    multiline
                    placeholder="Lister les sujets ici"
                    onChangeText={text => setMatiereVu(text)}
                />
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={() => {handleSoumettre()}}>
                <Text style={styles.textButton}>Suivant</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  sousTitre: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  button: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: "#092D74",
    borderRadius: 8,
  },
  textButton: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  rating:{
    marginBottom:20
  }
});
