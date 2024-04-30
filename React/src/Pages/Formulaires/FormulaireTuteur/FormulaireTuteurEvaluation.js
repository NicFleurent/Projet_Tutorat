import { StyleSheet, View, Text, Alert } from "react-native";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from '@react-navigation/native';
import * as SecureStore from "../../../api/SecureStore";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function FormulaireTuteurMatiere({route}) {
    const [matiereVu, setMatiereVu] = useState();
    const [rencontre_id, setRencontreId] = useState();
    const [rencontre_date, setRencontreDate] = useState();
    const [noteAide, setNoteAide] = useState(3);
    const [commantaireAide, setCommentaireAide] = useState();
    const [noteTuteur, setNoteTuteur] = useState(3);
    const [commentaireTuteur, setCommentaireTuteur] = useState();
    const [noteEvaluation, setNoteEvaluation] = useState(3);
    const [commantaireEvaluation, setCommentaireEvaluation] = useState("aucun");

    const navigation = useNavigation();

    useEffect(() => {
      setRencontreId(route.params?.rencontre_id);
      setRencontreDate(route.params?.rencontre_date);
      setMatiereVu(route.params?.matiereVu);
      setNoteAide(route.params?.noteAide);
      setCommentaireAide(route.params?.commantaireAide);
      setNoteTuteur(route.params?.noteTuteur);
      setCommentaireTuteur(route.params?.commentaireTuteur);
    }, 
    [
      route.params?.rencontre_id,
      route.params?.rencontre_date,
      route.params?.matiereVu,
      route.params?.noteAide,
      route.params?.commantaireAide,
      route.params?.noteTuteur,
      route.params?.commentaireTuteur
    ]);

    const handleSoumettre = async function(){
        const userInfo = JSON.parse(await SecureStore.getValue("user_info"));

        const headers = {
          'Accept': "application/vnd.api+json",
          'Content-Type': "application/vnd.api+json",
          'Authorization': `Bearer ${userInfo.token}`,
        };
    
        const data = {
          rencontre_id: rencontre_id,
          matiere_vu: matiereVu,
          note_aisance_aide: noteAide,
          commentaire_aisance_aide: commantaireAide,
          note_aisance_tuteur: noteTuteur,
          commentaire_aisance_tuteur: commentaireTuteur,
          note_evaluation: noteEvaluation,
          commentaire_evaluation: commantaireEvaluation
        };
    
        axios
          .post(process.env.EXPO_PUBLIC_API_URL + "formulaireTuteur/store", data, {
            headers: headers,
          })
          .then((response) => {
            navigation.navigate("Accueil", {
              //message: response.data.message
              message: "Formulaire du " + rencontre_date + " ajouté"
            });
          })
          .catch((error) => {
            Toast.show({
              type: "error",
              text1: error.response.data.message,
            });
          });
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

            <Toast position="top" bottomOffset={20} />
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
