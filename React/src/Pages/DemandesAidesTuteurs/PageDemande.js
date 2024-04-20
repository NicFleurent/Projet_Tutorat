import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from "react-native";
import Aide from "../../assets/svg/DemandeAideTuteur/Student.svg";
import Tuteur from "../../assets/svg/DemandeAideTuteur/Teacher.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomBottomSheet from "../../Components/CustomBottomSheetPageDemande";
import { useNavigation } from '@react-navigation/native';

export default function PageDemande() {
    const bottomSheetRef = useRef(null);
    const navigation = useNavigation();
    const handlePresentPress = () => bottomSheetRef.current?.present();
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titre}>Profils</Text>

            <View style={styles.image}>
                <Pressable onPress={() => {
                    navigation.navigate("ListeCoursAides"); //remplacer ListeCours par AuthChoice fonctionne
                }}>
                    <Aide width={230} height={230}></Aide>
                    <Text style={styles.titre}>Aidé</Text>


                    <View style={styles.sousTitreContainer}>
                        <Text style={styles.sousTitre}>Vous avez besoin d'aide pour mieux comprendre un cours ?</Text>
                    </View>
                </Pressable>
            </View>

            <View style={styles.image}>
                <Pressable onPress={handlePresentPress}>
                    <Tuteur width={230} height={230}></Tuteur>
                    <Text style={styles.titre}>Tuteur</Text>
                    <View style={styles.sousTitreContainer}>
                        <Text style={styles.sousTitre}>Vous voulez donner de votre temps pour aider vos pairs ?</Text>
                    </View>
                </Pressable>
                <CustomBottomSheet ref={bottomSheetRef} />
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
