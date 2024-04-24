import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ParametreOption from "../../Components/ParametreOption";
import * as SecureStore from "../../api/SecureStore";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../../Components/CustomButton";
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Toast from "react-native-toast-message";

export default function Disponibilites() {
  const [user, setUser] = useState([]);
  const [demandeTuteur, setDemandeTuteur] = useState();
  const [demandeTuteurChoisie, setDemandeTuteurChoisie] = useState();

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
                <TouchableOpacity key={demande.id} style={styles.button} onPress={() => onPressDemandeTuteur(demande.id)}>
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

  const bottomSheetRef = useRef(null);
  const onPressDemandeTuteur = (idDemande) => {
    setDemandeTuteurChoisie(idDemande);
    bottomSheetRef.current?.present();
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

    const data = {}

    axios.patch(process.env.EXPO_PUBLIC_API_URL + "cours/acceptTuteurCours/" + demandeTuteurChoisie, data, {
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

    axios.delete(process.env.EXPO_PUBLIC_API_URL + "cours/refuseTuteurCours/" + demandeTuteurChoisie, {
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

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Salut, {(user !== undefined) && (user.prenom)}</Text>
      <ScrollView style={styles.ScrollView}>
        <View>
          {getDemandeTuteur()}
        </View>
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetRef}
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
              bottomSheetRef.current.close();
            }}
          />
          <CustomButton
            text={"Refuser"}
            halfButton={false}
            style={styles.buttonSpace}
            onPress={() => {
              handleRefuser();
              bottomSheetRef.current.close();
            }}
          />
          <CustomButton
            text={"Annuler"}
            halfButton={false}
            style={styles.buttonSpace}
            onPress={() => {
              bottomSheetRef.current.close()
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
    marginTop: 50,
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
});
