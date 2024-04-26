import { StyleSheet, View, Text, Image, TouchableOpacity, Alert, FlatList } from "react-native";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ParametreOption from "../../Components/ParametreOption";
import * as SecureStore from "../../api/SecureStore";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../Components/CustomButton";
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Toast from "react-native-toast-message";

const Item = ({ item }) => (
  <View style={styles.item}>
      <Text>{item.tuteur.nom} {item.tuteur.prenom}</Text>
      <Text>{item.cours.nom}</Text>
  </View>
);

export default function Accueil() {
  const [user, setUser] = useState([]);
  const [demandeTuteur, setDemandeTuteur] = useState();
  const [demandeChoisie, setDemandeChoisie] = useState();
  const [demandeTutorat, setDemandeTutorat] = useState();
  const [typeDemande, setTypeDemande] = useState("");

  const [state, setState] = useState(0);

  const forceRefresh = () => {
    setState(state + 1);
  }

  useEffect(() => {
    SecureStore.getValue('user_info')
      .then((userInfo) => {
        setUser(JSON.parse(userInfo));

        userDemande = JSON.parse(userInfo);
        const headers = {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          'Authorization': `Bearer ${userDemande.token}`,
        }
        axios.get(process.env.EXPO_PUBLIC_API_URL + "cours/demandeAttente", { headers: headers })
          .then((response) => {
            setDemandeTuteur(response.data);
          })
          .catch((error) => console.log(error))

          axios.get(process.env.EXPO_PUBLIC_API_URL + "jumelages/demandeAttente", { headers: headers })
            .then((response) => {
              setDemandeTutorat(response.data);
            })
            .catch((error) => console.log(error))
      });
  }, [state]);

  const getDemandeTuteur = () => {
    if(demandeTuteur !== undefined && Object.keys(demandeTuteur).length !== 0){
      return(
        <>
          <Text style={styles.titreSection}>Demandes pour être tuteur</Text>
          {(demandeTuteur.map((demande) => {
            return (
              <>
                <TouchableOpacity key={demande.id} style={styles.button} onPress={() => onPressDemande(demande.id, "Tuteur")}>
                  <Text style={styles.text}>Cours : {demande.cours.nom} </Text>
                  <Text style={styles.text}>Demandeur : {demande.tuteur.prenom} {demande.tuteur.nom}</Text>
                </TouchableOpacity>
              </>
            )
          }))}
        </>
      )
    }
  }

  const getDemandeTutorat = () => {
    if(demandeTutorat !== undefined && Object.keys(demandeTutorat).length !== 0){
      return(
        <>
          <Text style={styles.titreSection}>Demandes de jumelages</Text>
          {(demandeTutorat.map((demande) => {
            return (
              <>
                <TouchableOpacity key={demande.id} style={styles.button} onPress={() => onPressDemande(demande.id, "Jumelage")}>
                  <Text style={styles.text}>Cours : {demande.cours.nom} </Text>
                  <Text style={styles.text}>Demandeur : {demande.tuteur.prenom} {demande.tuteur.nom}</Text>
                  <Text style={styles.text}>Moment : {demande.attributes.journee} à {demande.attributes.heure}</Text>
                </TouchableOpacity>
              </>
            )
          }))}
        </>
      )
    }
  }

  const bottomSheet = useRef(null);
  const onPressDemande = (idDemande, type) => {
    setDemandeChoisie(idDemande);
    setTypeDemande(type);
    console.log(demandeTutorat);
    bottomSheet.current?.present();
  };

  const snapPoints = useMemo(() => ['30%'], []);

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );

  const handleAccepter = async function () {
    const userInfo = JSON.parse(await SecureStore.getValue('user_info'));

    const headers = {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer ${userInfo.token}`,
    }
    
    let route_demande;
    if(typeDemande === "Tuteur"){
      route_demande = "cours/acceptTuteurCours/";
    }
    else if(typeDemande === "Jumelage"){
      route_demande = "jumelages/acceptJumelage/";
    }

    const data = {}

    axios.patch(process.env.EXPO_PUBLIC_API_URL + route_demande + demandeChoisie, data, {
      headers: headers
    })
      .then(response => {
        forceRefresh();
        Toast.show({
          type: "success",
          text1: response.data.message
        });
      })
      .catch(error => {
        Toast.show({
          type: "error",
          text1: error.response.data.message
        });
      });
  }

  const handleRefuser = async function () {
    const userInfo = JSON.parse(await SecureStore.getValue('user_info'));

    const headers = {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer ${userInfo.token}`,
    }
    
    let route_demande;
    if(typeDemande === "Tuteur"){
      route_demande = "cours/refuseTuteurCours/";
    }
    else if(typeDemande === "Jumelage"){
      route_demande = "jumelages/refuseJumelage/";
    }

    axios.delete(process.env.EXPO_PUBLIC_API_URL + route_demande + demandeChoisie, {
      headers: headers
    })
      .then(response => {
        forceRefresh();
        Toast.show({
          type: "success",
          text1: response.data.message
        });
      })
      .catch(error => {
        Toast.show({
          type: "error",
          text1: "Une erreur c'est produite",
          text2: error.response.data.message
        });
      });
  }

  const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? '#092D74' : '#E8ECF2';
      const color = item.id === selectedId ? 'white' : 'black';

      return (
          <Item
              item={item}
              onPress={() => setSelectedId(item.id)}
              backgroundColor={backgroundColor}
              textColor={color}
          />
      );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Salut, {(user !== undefined) && (user.prenom)}</Text>
      <ScrollView style={styles.ScrollView}>
        <View>
          {getDemandeTuteur()}
        </View>
        <View>
          {getDemandeTutorat()}
        </View>

        <FlatList
            data={demandeTuteur}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={item => item.id.toString()}
        />
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheet}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: '#DFCCE4' }}
        backgroundStyle={{ backgroundColor: '#092D74' }}
      >
        <View style={styles.contentContainer}>
          <CustomButton
            text={"Accepter"}
            halfButton={false}
            style={styles.buttonSpace}
            onPress={() => {
              handleAccepter();
              bottomSheet.current.close();
            }}
          />
          <CustomButton
            text={"Refuser"}
            halfButton={false}
            style={styles.buttonSpace}
            onPress={() => {
              handleRefuser();
              bottomSheet.current.close();
            }}
          />
          <CustomButton
            text={"Annuler"}
            halfButton={false}
            style={styles.buttonSpace}
            onPress={() => {
              bottomSheet.current.close()
            }}
          />
        </View>
      </BottomSheetModal>

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
  titre: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10,
  },
  sousTitre: {
    fontSize: 12,
    marginTop: 10,
  },
  titreSection: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20
  },
  parameterView: {
    marginTop: 45,
  },
  parameterViewTest: {
    marginTop: 30,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#092D74",
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  ScrollView: {
    marginBottom:20
  },
  item: {
      backgroundColor: '#fff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 7,
      borderWidth: 1,
      borderColor: '#ccc'
  }
});
