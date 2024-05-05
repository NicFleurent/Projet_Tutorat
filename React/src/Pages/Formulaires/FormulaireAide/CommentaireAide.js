import { StyleSheet, View, Text } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from '@react-navigation/native';
import * as SecureStore from "../../../api/SecureStore";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function CommentaireFormAide({route}) {
    const navigation = useNavigation();
    const [commentaire, setCommentaire] = useState("aucun");

    const handleSoumettre = async function(){
      const userInfo = JSON.parse(await SecureStore.getValue("user_info"));

        const headers = {
          'Accept': "application/vnd.api+json",
          'Content-Type': "application/vnd.api+json",
          'Authorization': `Bearer ${userInfo.token}`,
        };
    
        const data = {
          noteProfesseur: commentaire
        };
    
        axios.patch(
            process.env.EXPO_PUBLIC_API_URL + "formulaireAide/ajoutCommentaire/" + route.params?.formulaire_id, 
            data, 
            { headers: headers }
          )
          .then((response) => {
            navigation.reset({
              index: 3,
              routes: [{ name: 'Accueil', params: { message: response.data.message } }]
            });
          })
          .catch((error) => {
            Toast.show({
              type: "error",
              text1: "Une erreur c'est produite",
            });
            console.log(error.response.data.message)
          });
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.section}>
                  <Text style={styles.sousTitre}>
                      Ajouter des commentaires
                  </Text>
                  <TextInput 
                      style={styles.input} 
                      multiline
                      placeholder="Commentaires"
                      onChangeText={text => setCommentaire(text)}
                  />
                </View>
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
