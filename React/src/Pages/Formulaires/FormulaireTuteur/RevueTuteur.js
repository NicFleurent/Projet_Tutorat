import { StyleSheet, View, Text } from "react-native";
import { Rating, AirbnbRating } from 'react-native-ratings';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from '@react-navigation/native';

export default function RevueFormAide({route}) {
    const navigation = useNavigation();

    const handleSoumettre = function(){
        navigation.navigate("Jumelage - Commentaire", {
          formulaire_id: route.params?.FormulaireAide.id
        });
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.section}>
                    <View style={styles.note}>
                        <Text style={styles.sousTitre}>
                            Aisance de l'aidé
                        </Text>
                        <AirbnbRating 
                                showRating={false}
                                selectedColor="#092D74"
                                size={24}
                                defaultRating={route.params?.FormulaireAide.attributes.note_aisance_aide}
                                count={4}
                                ratingContainerStyle={styles.rating}
                                isDisabled={true}
                                onFinishRating={(rating)=>{setNoteAide(rating)}}
                        />
                    </View>
                    <Text style={styles.commentaire}>
                        {route.params?.FormulaireAide.attributes.commentaire_aisance_aide}
                    </Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.note}>
                        <Text style={styles.sousTitre}>
                            Aisance du tuteur
                        </Text>
                        <AirbnbRating 
                                showRating={false}
                                selectedColor="#092D74"
                                size={24}
                                defaultRating={route.params?.FormulaireAide.attributes.note_aisance_tuteur}
                                count={4}
                                ratingContainerStyle={styles.rating}
                                isDisabled={true}
                                onFinishRating={(rating)=>{setNoteAide(rating)}}
                        />
                    </View>
                    <Text style={styles.commentaire}>
                        {route.params?.FormulaireAide.attributes.commentaire_aisance_tuteur}
                    </Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.note}>
                        <Text style={styles.sousTitre}>
                            Évaluation générale
                        </Text>
                        <AirbnbRating 
                                showRating={false}
                                selectedColor="#092D74"
                                size={24}
                                defaultRating={route.params?.FormulaireAide.attributes.note_evaluation}
                                count={4}
                                ratingContainerStyle={styles.rating}
                                isDisabled={true}
                                onFinishRating={(rating)=>{setNoteAide(rating)}}
                        />
                    </View>
                    <Text style={styles.commentaire}>
                        {route.params?.FormulaireAide.attributes.commentaire_evaluation}
                    </Text>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={() => {handleSoumettre()}}>
                <Text style={styles.textButton}>Ajouter des commentaires</Text>
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
  section:{
    marginTop:30,
  },
  note:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:10
  },
  sousTitre: {
    fontSize: 24,
    fontWeight: "bold",
  },
  rating:{
    marginBottom:0
  },
  commentaire: {
    fontSize: 20,
    marginHorizontal:20
  },
  label: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    marginTop:30,
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
  }
});
