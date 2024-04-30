import { StyleSheet, View, Text } from "react-native";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from '@react-navigation/native';

export default function FormulaireTuteurMatiere({route}) {
    const [matiereVu, setMatiereVu] = useState();
    const [rencontre_id, setRencontreId] = useState();
    const [noteAide, setNoteAide] = useState(3);
    const [commantaireAide, setCommentaireAide] = useState();
    const [noteTuteur, setNoteTuteur] = useState(3);
    const [commentaireTuteur, setCommentaireTuteur] = useState();
    const [noteEvaluation, setNoteEvaluation] = useState(3);
    const [commantaireEvaluation, setCommentaireEvaluation] = useState("aucun");

    const navigation = useNavigation();

    useEffect(() => {
      setRencontreId(route.params?.rencontre_id);
      setMatiereVu(route.params?.matiereVu);
      setNoteAide(route.params?.noteAide);
      setCommentaireAide(route.params?.commantaireAide);
      setNoteTuteur(route.params?.noteTuteur);
      setCommentaireTuteur(route.params?.commentaireTuteur);
    }, 
    [
      route.params?.rencontre_id,
      route.params?.matiereVu,
      route.params?.noteAide,
      route.params?.commantaireAide,
      route.params?.noteTuteur,
      route.params?.commentaireTuteur
    ]);

    const handleSoumettre = function(){
        console.log(noteEvaluation);
        console.log(commantaireEvaluation);
        console.log(noteTuteur);
        console.log(commentaireTuteur);
        console.log(noteAide);
        console.log(commantaireAide);
        console.log(rencontre_id);
        console.log(matiereVu);
        
        //navigation.navigate("Accueil");
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.sousTitre}>
                    Comment évaluer vous le déroulement de la rencontre?
                </Text>
                <AirbnbRating 
                        reviews={[
                            "Elle a très mal été", 
                            "Elle a mal été", 
                            "Elle s'est bien déroulé", 
                            "Elle s'est très bien déroulé"
                        ]}
                        selectedColor="#092D74"
                        reviewColor="#092D74"
                        reviewSize={20}
                        count={4}
                        ratingContainerStyle={styles.rating}
                        onFinishRating={(rating)=>{setNoteEvaluation(rating)}}
                />
                <TextInput 
                    style={styles.input} 
                    multiline
                    placeholder="Commentaire"
                    onChangeText={text => setCommentaireEvaluation(text)}
                />
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={() => {handleSoumettre()}}>
                <Text style={styles.textButton}>Soumettre</Text>
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
