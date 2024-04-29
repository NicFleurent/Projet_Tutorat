import { StyleSheet, View, Text } from "react-native";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

export default function FormulaireTuteur() {
    const [matiereVu, setMatiereVu] = useState();
    const [noteAide, setNoteAide] = useState(3);
    const [commantaireAide, setCommentaireAide] = useState("");
    const [noteTuteur, setNoteTuteur] = useState(3);
    const [commentaireTuteur, setCommentaireTuteur] = useState("");
    const [noteEvaluation, setNoteEvaluation] = useState(3);
    const [commantaireEvaluation, setCommentaireEvaluation] = useState("");

    const handleSoumettre = function(){
        console.log(matiereVu);
        console.log(noteAide);
        console.log(commantaireAide);
        console.log(noteTuteur);
        console.log(commentaireTuteur);
        console.log(noteEvaluation);
        console.log(commantaireEvaluation);
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.titre}>Matière vu</Text>
                <Text style={styles.sousTitre}>
                    Quels sont les sujets que vous avez abordés pendant la rencontre?
                </Text>
                <TextInput 
                    style={styles.input} 
                    multiline
                    placeholder="Lister les sujets ici"
                    onChangeText={text => setMatiereVu(text)}
                />
                <Text style={styles.titre}>Aisance de l'aidé</Text>
                <Text style={styles.sousTitre}>
                    Est-ce que votre aidé semblait à l'aise tout au long de la rencontre?
                </Text>
                <AirbnbRating 
                        reviews={[
                            "L'aidé était très incorfortable", 
                            "L'aidé était inconfortable", 
                            "L'aidé était à l'aise", 
                            "L'aidé était très à l'aise"]}
                        selectedColor="#092D74"
                        reviewColor="#092D74"
                        reviewSize={20}
                        count={4}
                        showRating={true}
                        ratingContainerStyle={styles.rating}
                        onFinishRating={(rating)=>{setNoteAide(rating)}}
                />
                <TextInput 
                    style={styles.input} 
                    multiline
                    placeholder="Commentaire"
                    onChangeText={text => setCommentaireAide(text)}
                />
                <Text style={styles.titre}>Aisance du tuteur</Text>
                <Text style={styles.sousTitre}>
                    Est-ce que vous étiez à l'aise tout au long de la rencontre?
                </Text>
                <AirbnbRating 
                        reviews={[
                            "J'étais très incorfortable", 
                            "J'étais inconfortable", 
                            "J'étais à l'aise", 
                            "J'étais très à l'aise"
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
                <Text style={styles.titre}>Évaluation de la rencontre</Text>
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

                <TouchableOpacity style={styles.button} onPress={() => {handleSoumettre()}}>
                    <Text style={styles.textButton}>Soumettre</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity key={demande.id} style={styles.button} onPress={() => onPressDemande(demande.id, "Jumelage")}>
                    <Text style={styles.text}>Cours : {demande.cours.nom} </Text>
                    <Text style={styles.text}>Demandeur : {demande.tuteur.prenom} {demande.tuteur.nom}</Text>
                    <Text style={styles.text}>Moment : {demande.attributes.journee} à {heure}</Text>
                </TouchableOpacity> */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  titre: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10,
  },
  sousTitre: {
    fontSize: 20,
    marginTop: 10,
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
    marginTop: 20,
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
