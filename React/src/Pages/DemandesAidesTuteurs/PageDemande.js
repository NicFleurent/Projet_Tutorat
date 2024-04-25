import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from "react-native";
import Aide from "../../assets/svg/DemandeAideTuteur/Student.svg";
import Tuteur from "../../assets/svg/DemandeAideTuteur/Teacher.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomBottomSheet from "../../Components/BottomSheetPageDemande";
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from "react-native-toast-message";

export default function PageDemande({route}) {
    useEffect(() => {
        if (route.params?.message) {
            Toast.show({
                type: "success",
                text1: route.params.message,
                text1Style : { fontSize: 14 }
            });
        }
    }, [route.params?.message]);

    const bottomSheetRef = useRef(null);
    const navigation = useNavigation();
    const handlePresentPress = () => bottomSheetRef.current?.present();
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.titrePage}>Profils</Text>
            </View>
            <View style={styles.image}>
                <Pressable onPress={() => {
                    navigation.navigate("Liste des cours - Aidé"); 
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
            <Toast position="top" bottomOffset={20} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    titrePage: {
        fontSize: 32,
        fontWeight: "bold",
    },
    titre: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: "center",
        marginBottom: 10,
    },
    image: {
        marginTop: 20,
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
