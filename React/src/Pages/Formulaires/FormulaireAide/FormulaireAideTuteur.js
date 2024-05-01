import { StyleSheet, View, Text } from "react-native";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from '@react-navigation/native';

export default function FormulaireTuteurMatiere({route}) {
    const [jumelage_id, setJumelageId] = useState();
    const [noteAide, setNoteAide] = useState(3);
    const [commantaireAide, setCommentaireAide] = useState();
    const [noteTuteur, setNoteTuteur] = useState(3);
    const [commentaireTuteur, setCommentaireTuteur] = useState("aucun");

    const navigation = useNavigation();

    useEffect(() => {
      setJumelageId(route.params?.jumelage_id);
      setNoteAide(route.params?.noteAide);
      setCommentaireAide(route.params?.commantaireAide);
    }, 
    [
      route.params?.jumelage_id,
      route.params?.noteAide,
      route.params?.commantaireAide
    ]);

    const handleSoumettre = function(){
        navigation.navigate("Jumelage - Évaluation", {
          jumelage_id: jumelage_id,
          noteAide: noteAide,
          commantaireAide: commantaireAide,
          noteTuteur: noteTuteur,
          commentaireTuteur: commentaireTuteur
        });
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.sousTitre}>
                    Est-ce que votre tuteur était à l'aise tout au long des rencontres?
                </Text>
                <AirbnbRating 
                        reviews={[
                            "Le tuteur était très incorfortable", 
                            "Le tuteur était inconfortable", 
                            "Le tuteur était à l'aise", 
                            "Le tuteur était très à l'aise"
                        ]}
                        selectedColor="#092D74"
                        reviewColor="#092D74"
                        reviewSize={20}
                        count={4}
                        ratingContainerStyle={styles.rating}
                        onFinishRating={(rating)=>{setNoteTuteur(rating)}}
                />
                <TextInput 
                    style={styles.input} 
                    multiline
                    placeholder="Commentaire"
                    onChangeText={text => setCommentaireTuteur(text)}
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
