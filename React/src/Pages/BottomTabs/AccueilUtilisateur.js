import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import ParametreOption from "../../Components/ParametreOption";
import * as SecureStore from "../../api/SecureStore";
import axios from "axios";

export default function Disponibilites() {
  const [user, setUser] = useState([]);
  const [demandeTuteur, setDemandeTuteur] = useState();

  useEffect(() => {
    SecureStore.getValue('user_info')
    .then((userInfo) => {
      setUser(JSON.parse(userInfo));

      userDemande = JSON.parse(userInfo);
      const headers = {
          'Accept':'application/vnd.api+json',
          'Content-Type':'application/vnd.api+json',
          'Authorization': `Bearer ${userDemande.token}`,
      }
      axios.get(process.env.EXPO_PUBLIC_API_URL + "cours/demandeAttente", {headers:headers})
      .then((response) =>{ 
        console.log(response.data);
        setDemandeTuteur(response.data);
      })
      .catch((error)=>console.log(error))
    });
  }, []);

  useEffect(() => {
    if(demandeTuteur !== undefined){
      demandeTuteur.map((demande)=>{
        console.log(demande.attributes)
      })
    }
  }, [demandeTuteur]);

  const onPress = () => Alert.alert('test');

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Salut, {(user!==undefined)&&(user.prenom)}</Text>

      {(demandeTuteur !== undefined) && 
        (
          demandeTuteur.map((demande) => {
            <Text>{demande}</Text>
          })
        )
      }

      <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.text}>
            test
          </Text>
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
  titre: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 100,
  },
  sousTitre: {
    fontSize: 12,
    marginTop: 10,
  },
  parameterView: {
    marginTop: 45,
  },
  parameterViewTest: {
    marginTop: 30,
  },
  button: {
    marginTop:20,
    paddingVertical: 15,
    backgroundColor: "#092D74",
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
