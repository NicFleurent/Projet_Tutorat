import { StyleSheet, View, Text, Image, TouchableOpacity, Alert, FlatList } from "react-native";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import * as SecureStore from "../../api/SecureStore";
import axios from "axios";
import CustomButton from "../../Components/CustomButton";
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Toast from "react-native-toast-message";
import { Ionicons } from '@expo/vector-icons';
import Collapsible from "react-native-collapsible";
import { useNavigation } from '@react-navigation/native';

export default function Accueil({ route }) {

  const [user, setUser] = useState([]);
  const [demandeChoisie, setDemandeChoisie] = useState();
  const [demandeTuteur, setDemandeTuteur] = useState();
  const [demandeTutorat, setDemandeTutorat] = useState();
  const [rencontresAVenir, setRencontreAVenir] = useState();
  const [formulaireTuteur, setFormulaireTuteur] = useState();
  const [formulaireJumelage, setFormulaireJumelage] = useState();
  const [typeDemande, setTypeDemande] = useState("");
  const [selectedIdTuteur, setSelectedIdTuteur] = useState();
  const [selectedIdTutorat, setSelectedIdTutorat] = useState();
  const [selectedIdRencontreVenir, setSelectedIdRencontreVenir] = useState();
  const [selectedIdFormulaireTuteur, setSelectedIdFormulaireTuteur] = useState();
  const [selectedIdFormulaireJumelage, setSelectedIdFormulaireJumelage] = useState();
  const [collapsedTuteur, setCollapsedTuteur] = useState(true);
  const [collapsedTutorat, setCollapsedTutorat] = useState(true);
  const [collapsedFormulaireTuteur, setCollapsedFormulaireTuteur] = useState(true);
  const [collapsedFormulaireJumelage, setCollapsedFormulaireJumelage] = useState(true);
  const [collapsedRencontreVenir, setCollapsedRencontreVenir] = useState(false);

  const [date, setDate] = useState();
  const [heure, setHeure] = useState();

  const [state, setState] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    forceRefresh();
    setCollapsedTuteur(true);
    setCollapsedTutorat(true);
    setCollapsedFormulaireTuteur(true);
    setCollapsedRencontreVenir(false);
    if (route.params?.message) {
      Toast.show({
        type: "success",
        text1: route.params.message,
        text1Style: { fontSize: 13 }
      });
    }
  }, [route.params?.message]);

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

        axios.get(process.env.EXPO_PUBLIC_API_URL + "rencontres/prochainesRencontres", { headers: headers })
          .then((response) => {
            setRencontreAVenir(response.data);
          })
          .catch((error) => console.log(error))

        axios.get(process.env.EXPO_PUBLIC_API_URL + "rencontres/rencontresSansFormulaire", { headers: headers })
          .then((response) => {
            setFormulaireTuteur(response.data);
          })
          .catch((error) => console.log(error))

        axios.get(process.env.EXPO_PUBLIC_API_URL + "jumelages/jumelageSansFormulaire", { headers: headers })
          .then((response) => {
            setFormulaireJumelage(response.data);
          })
          .catch((error) => console.log(error))
      });
  }, [state]);

  const getDemandeTuteur = () => {
    if (demandeTuteur !== undefined && Object.keys(demandeTuteur).length !== 0) {
      return (
        <>
          <View style={styles.dropdownView}>
            <TouchableOpacity style={styles.boxTitreSection} onPress={() => {
              forceRefresh();
              setCollapsedTuteur(!collapsedTuteur);
              setCollapsedTutorat(true);
              setCollapsedFormulaireTuteur(true);
              setCollapsedRencontreVenir(true);
              setCollapsedFormulaireJumelage(true);
            }}>
              <Text style={styles.titreSection}>Demandes pour être tuteur</Text>
              <Ionicons
                name={collapsedTuteur ? "arrow-down-circle" : "arrow-up-circle"}
                color={"#092D74"}
                size={30} />
            </TouchableOpacity>
            <Collapsible collapsed={collapsedTuteur}>
              <FlatList
                data={demandeTuteur}
                renderItem={renderItemTuteur}
                keyExtractor={item => item.id.toString()}
                extraData={selectedIdTuteur}
                initialNumToRender={3}
                maxToRenderPerBatch={1}
                windowSize={1}
              />
            </Collapsible>
          </View>
        </>
      )
    }
  }

  const getDemandeTutorat = () => {
    if (demandeTutorat !== undefined && Object.keys(demandeTutorat).length !== 0) {
      return (
        <>
          <View style={styles.dropdownView}>
            <TouchableOpacity style={styles.boxTitreSection} onPress={() => {
              forceRefresh();
              setCollapsedTutorat(!collapsedTutorat);
              setCollapsedTuteur(true);
              setCollapsedFormulaireTuteur(true);
              setCollapsedRencontreVenir(true);
              setCollapsedFormulaireJumelage(true);
            }}>
              <Text style={styles.titreSection}>Demandes de jumelages</Text>
              <Ionicons
                name={collapsedTutorat ? "arrow-down-circle" : "arrow-up-circle"}
                color={"#092D74"}
                size={30} />
            </TouchableOpacity>
            <Collapsible collapsed={collapsedTutorat}>
              <FlatList
                data={demandeTutorat}
                renderItem={renderItemJumelage}
                keyExtractor={item => item.id.toString()}
                extraData={selectedIdTutorat}
                initialNumToRender={3}
                maxToRenderPerBatch={1}
                windowSize={1}
              />
            </Collapsible>
          </View>

        </>
      )
    }
  }

  const getRencontreAVenir = () => {
    if (rencontresAVenir !== undefined && Object.keys(rencontresAVenir).length !== 0) {
      return (
        <>
          <View style={styles.dropdownView}>
            <TouchableOpacity style={styles.boxTitreSection} onPress={() => {
              forceRefresh();
              setCollapsedRencontreVenir(!collapsedRencontreVenir);
              setCollapsedTutorat(true);
              setCollapsedTuteur(true);
              setCollapsedFormulaireTuteur(true);
              setCollapsedFormulaireJumelage(true);
            }}>
              <Text style={styles.titreSection}>Rencontres à venir</Text>
              <Ionicons
                name={collapsedRencontreVenir ? "arrow-down-circle" : "arrow-up-circle"}
                color={"#092D74"}
                size={30} />
            </TouchableOpacity>
            <Collapsible collapsed={collapsedRencontreVenir}>
              <FlatList
                data={rencontresAVenir}
                renderItem={renderItemRencontre}
                keyExtractor={item => item.id.toString()}
                extraData={selectedIdRencontreVenir}
              />
            </Collapsible>
          </View>

        </>
      )
    }
  }

  const getFormulaireTuteur = () => {
    if (formulaireTuteur !== undefined && Object.keys(formulaireTuteur).length !== 0) {
      return (
        <>
          <View style={styles.dropdownView}>
            <TouchableOpacity style={styles.boxTitreSection} onPress={() => {
              forceRefresh();
              setCollapsedFormulaireTuteur(!collapsedFormulaireTuteur);
              setCollapsedRencontreVenir(true);
              setCollapsedTutorat(true);
              setCollapsedTuteur(true);
              setCollapsedFormulaireJumelage(true);
            }}>
              <Text style={styles.titreSection}>Formulaires de rencontre</Text>
              <Ionicons
                name={collapsedFormulaireTuteur ? "arrow-down-circle" : "arrow-up-circle"}
                color={"#092D74"}
                size={30} />
            </TouchableOpacity>
            <Collapsible collapsed={collapsedFormulaireTuteur}>
              <FlatList
                data={formulaireTuteur}
                renderItem={renderItemFormulaireTuteur}
                keyExtractor={item => item.id.toString()}
                extraData={selectedIdFormulaireTuteur}
                initialNumToRender={3}
                maxToRenderPerBatch={1}
                windowSize={1}
              />
            </Collapsible>
          </View>

        </>
      )
    }
  }

  const getFormulaireJumelage = () => {
    if (formulaireJumelage !== undefined && Object.keys(formulaireJumelage).length !== 0) {
      return (
        <>
          <View style={styles.dropdownView}>
            <TouchableOpacity style={styles.boxTitreSection} onPress={() => {
              forceRefresh();
              setCollapsedFormulaireJumelage(!collapsedFormulaireJumelage);
              setCollapsedFormulaireTuteur(true);
              setCollapsedRencontreVenir(true);
              setCollapsedTutorat(true);
              setCollapsedTuteur(true);
            }}>
              <Text style={styles.titreSection}>Formulaire de jumelage</Text>
              <Ionicons
                name={collapsedFormulaireJumelage ? "arrow-down-circle" : "arrow-up-circle"}
                color={"#092D74"}
                size={30} />
            </TouchableOpacity>
            <Collapsible collapsed={collapsedFormulaireJumelage}>
              <FlatList
                data={formulaireJumelage}
                renderItem={renderItemFormulaireJumelage}
                keyExtractor={item => item.id.toString()}
                extraData={selectedIdFormulaireJumelage}
                initialNumToRender={3}
                maxToRenderPerBatch={1}
                windowSize={1}
              />
            </Collapsible>
          </View>

        </>
      )
    }
  }

  const getAccueilVide = () => {
    if ((formulaireJumelage == undefined || Object.keys(formulaireJumelage).length == 0) &&
      (formulaireTuteur == undefined || Object.keys(formulaireTuteur).length == 0) &&
      (rencontresAVenir == undefined || Object.keys(rencontresAVenir).length == 0) &&
      (demandeTutorat == undefined || Object.keys(demandeTutorat).length == 0) &&
      (demandeTuteur == undefined || Object.keys(demandeTuteur).length == 0)) {
      return (
        <>
          <Text style={styles.titreVide}>Aucune actualité</Text>
        </>
      )
    }
  }

  const bottomSheet = useRef(null);
  const bottomSheetRencontre = useRef(null);

  const onPressDemande = (idDemande, type) => {
    setDemandeChoisie(idDemande);
    setTypeDemande(type);
    if (type === "Tuteur") {
      setSelectedIdTuteur(idDemande);
      setSelectedIdTutorat(-1);
      setSelectedIdRencontreVenir(-1);
      setSelectedIdFormulaireTuteur(-1);
      setSelectedIdFormulaireJumelage(-1);
      bottomSheet.current?.present();
    }
    else if (type === "Jumelage") {
      setSelectedIdTutorat(idDemande);
      setSelectedIdTuteur(-1);
      setSelectedIdRencontreVenir(-1);
      setSelectedIdFormulaireTuteur(-1);
      setSelectedIdFormulaireJumelage(-1);
      bottomSheet.current?.present();
    }
    else if (type === "RencontreVenir") {
      setSelectedIdRencontreVenir(idDemande);
      setSelectedIdTutorat(-1);
      setSelectedIdTuteur(-1);
      setSelectedIdFormulaireTuteur(-1);
      setSelectedIdFormulaireJumelage(-1);
      bottomSheetRencontre.current?.present();
    }
  };

  const onPressFormulaire = (id, type) => {
    if (type === "Tuteur") {
      navigation.navigate("Rencontres - Matière vu", { rencontre_id: id });
    }
    else if (type === "Jumelage") {
      navigation.navigate("Jumelage - Aidé", { jumelage_id: id });
    }
  };



  const renderItemTuteur = ({ item }) => {
    const backgroundColor = item.id === selectedIdTuteur ? '#092D74' : '#E8ECF2';
    const color = item.id === selectedIdTuteur ? 'white' : 'black';

    return (
      <ItemTuteur
        item={item}
        onPress={() => onPressDemande(item.id, "Tuteur")}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const renderItemJumelage = ({ item }) => {
    const backgroundColor = item.id === selectedIdTutorat ? '#092D74' : '#E8ECF2';
    const color = item.id === selectedIdTutorat ? 'white' : 'black';

    return (
      <ItemJumelage
        item={item}
        onPress={() => onPressDemande(item.id, "Jumelage")}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  const onPressItemRencontre = (item) => {
    setDate(item.attributes.date);
    setHeure(item.attributes.heure);
    // Autres actions à effectuer lors de l'appui sur un élément ItemRencontre
  };

  const renderItemRencontre = ({ item }) => {
    const backgroundColor = item.id === selectedIdRencontreVenir ? '#092D74' : '#E8ECF2';
    const color = item.id === selectedIdRencontreVenir ? 'white' : 'black';

   
  return (
    <ItemRencontre
      item={item}
      onPress={() => {
        onPressItemRencontre(item);
        onPressDemande(item.id, "RencontreVenir"); // ou toute autre action que vous souhaitez effectuer
      }}
      backgroundColor={backgroundColor}
      textColor={color}
    />
  );
};
  const renderItemFormulaireTuteur = ({ item }) => {
    const backgroundColor = item.id === selectedIdRencontreVenir ? '#092D74' : '#E8ECF2';
    const color = item.id === selectedIdRencontreVenir ? 'white' : 'black';

    return (
      <ItemFormulaireTuteur
        item={item}
        onPress={() => onPressFormulaire(item.id, "Tuteur")}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const renderItemFormulaireJumelage = ({ item }) => {
    const backgroundColor = item.id === selectedIdRencontreVenir ? '#092D74' : '#E8ECF2';
    const color = item.id === selectedIdRencontreVenir ? 'white' : 'black';

    return (
      <ItemFormulaireJumelage
        item={item}
        onPress={() => onPressFormulaire(item.id, "Jumelage")}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const ItemTuteur = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
      <View style={styles.textFlatlist}>
        <Text style={{ color: textColor }}>{'Nom : ' + item.tuteur.prenom} {item.tuteur.nom}</Text>
        <Text style={{ color: textColor }}>{'Cours : ' + item.cours.nom}</Text>
      </View>
    </TouchableOpacity>
  );

  const ItemJumelage = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
      <View style={styles.textFlatlist}>
        <Text style={{ color: textColor }}>{'Nom : ' + item.aide.prenom} {item.aide.nom}</Text>
        <Text style={{ color: textColor }}>{'Cours : ' + item.cours.nom}</Text>
        <Text style={{ color: textColor }}>{'Moment : ' + item.attributes.journee + ' à ' + item.attributes.heure}</Text>
      </View>
    </TouchableOpacity>
  );

  const TextRencontre = function (jumelage) {
    if (jumelage.tuteur_id === user.id) {
      return (<Text>{'Aidé : ' + jumelage.aide.prenom + " " + jumelage.aide.nom}</Text>);
    }
    else {
      return (<Text>{'Tuteur : ' + jumelage.tuteur.prenom + " " + jumelage.tuteur.nom}</Text>);
    }
  }

  const ItemRencontre = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
      <View style={styles.textFlatlist}>
        <Text style={{ color: textColor }}>{'Moment : ' + item.jumelage.journee + " le " + item.attributes.date + " à " + item.attributes.heure}</Text>
        <Text style={{ color: textColor }}>{'Cours : ' + item.jumelage.cours.nom}</Text>
        <Text style={{ color: textColor }}>{TextRencontre(item.jumelage)}</Text>
      </View>
    </TouchableOpacity>
  );

  const ItemFormulaireTuteur = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
      <View style={styles.textFlatlist}>
        <Text style={{ color: textColor }}>{'Moment : ' + item.jumelage.journee + " le " + item.attributes.date + " à " + item.attributes.heure}</Text>
        <Text style={{ color: textColor }}>{'Cours : ' + item.jumelage.cours.nom}</Text>
        <Text style={{ color: textColor }}>{'Tuteur : ' + item.jumelage.aide.prenom + " " + item.jumelage.aide.prenom}</Text>
      </View>
    </TouchableOpacity>
  );

  const ItemFormulaireJumelage = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
      <View style={styles.textFlatlist}>
        <Text style={{ color: textColor }}>{'Moment : ' + item.attributes.journee + " à " + item.attributes.heure}</Text>
        <Text style={{ color: textColor }}>{'Cours : ' + item.cours.nom}</Text>
        <Text style={{ color: textColor }}>{'Tuteur : ' + item.tuteur.prenom + " " + item.tuteur.nom}</Text>
      </View>
    </TouchableOpacity>
  );

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
    if (typeDemande === "Tuteur") {
      route_demande = "cours/acceptTuteurCours/";
    }
    else if (typeDemande === "Jumelage") {
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
          text1: error.response.data.status
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
    if (typeDemande === "Tuteur") {
      route_demande = "cours/refuseTuteurCours/";
    }
    else if (typeDemande === "Jumelage") {
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
          text1: error.response.data.message
        });
      });
  }

  const handleCanceller = async function () {
    const userInfo = JSON.parse(await SecureStore.getValue('user_info'));

    const headers = {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer ${userInfo.token}`,
    }

    axios.delete(process.env.EXPO_PUBLIC_API_URL + 'rencontres/cancellerRencontre/' + selectedIdRencontreVenir, {
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
          text1: error.response.message
        });
      });
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerFlatlists}>
        <Text style={styles.titre}>Salut, {(user !== undefined) && (user.prenom)}</Text>
        <View>
          {getDemandeTuteur()}
        </View>
        <View>
          {getDemandeTutorat()}
        </View>
        <View>
          {getFormulaireTuteur()}
        </View>
        <View>
          {getFormulaireJumelage()}
        </View>
        <View>
          {getRencontreAVenir()}
        </View>
        <View>
          {getAccueilVide()}
        </View>
      </View>


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
              bottomSheet.current.close();
              setSelectedIdTuteur(-1);
              setSelectedIdTutorat(-1);
            }}
          />
        </View>
      </BottomSheetModal>

      <BottomSheetModal
        ref={bottomSheetRencontre}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: '#DFCCE4' }}
        backgroundStyle={{ backgroundColor: '#092D74' }}
      >
        <View style={styles.contentContainer}>
          <CustomButton
            text={"Modifier"}
            halfButton={false}
            style={styles.buttonSpace}
            onPress={() => {
              navigation.navigate("Modification - Rencontre", {
                idRencontre: selectedIdRencontreVenir,
                date: date,
                heure: heure
              });

              bottomSheetRencontre.current.close();
              setSelectedIdRencontreVenir(-1);
            }}
          />
          <CustomButton
            text={"Canceller"}
            halfButton={false}
            style={styles.buttonSpace}
            onPress={() => {
              handleCanceller();
              bottomSheetRencontre.current.close();
              setSelectedIdRencontreVenir(-1);
            }}
          />
          <CustomButton
            text={"Annuler"}
            halfButton={false}
            style={styles.buttonSpace}
            onPress={() => {
              bottomSheetRencontre.current.close();
              setSelectedIdTuteur(-1);
              setSelectedIdTutorat(-1);
              setSelectedIdRencontreVenir(-1);
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
    padding: 15,
  },
  containerFlatlists: {
    height: '80%'
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
  boxTitreSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titreSection: {
    fontSize: 20,
    fontWeight: "bold",
  },
  titreVide: {
    textAlign: 'center',
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
    marginBottom: 20
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  dropdownView: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#ccc',
  }
});
