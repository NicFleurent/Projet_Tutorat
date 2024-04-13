import { StyleSheet, View, Text, Pressable } from "react-native";
import Aide from "../../assets/svg/DemandeAideTuteur/Student.svg"
import Tuteur from "../../assets/svg/DemandeAideTuteur/Teacher.svg"
import { SafeAreaView } from "react-native-safe-area-context";


export default function PageDemande() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titre}>Demande</Text>

            <View style={styles.image}>
                <Aide width={230} height={230}></Aide>
                <Text style={styles.titre}>Aidé</Text>
                <View style={styles.sousTitreContainer}>
                    <Text style={styles.sousTitre}>Vous avez besoin d'aide pour mieux comprendre un cours ?</Text>
                </View>
            </View>

            <View style={styles.image}>
                <Pressable>
                    <Tuteur width={230} height={230}></Tuteur>
                </Pressable>
                <Text style={styles.titre}>Tuteur</Text>
                <View style={styles.sousTitreContainer}>
                    <Text style={styles.sousTitre}>Vous voulez donner de votre temps pour aider vos pairs ?</Text>
                </View>
            </View>

        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    titre: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",

    },
    image: {
        marginBottom: 20,
        flex: 1
    },

    sousTitre: {
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: "center",
        color: "#7B868B",
    },
    sousTitreContainer: {
        width: 230,
        alignItems: "center",
    },
});
