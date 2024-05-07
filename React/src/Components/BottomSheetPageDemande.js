import { View, StyleSheet, Alert } from 'react-native';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from "../api/SecureStore";
import axios from "axios";

const CustomBottomSheetModalPageDemande = React.forwardRef((props, ref) => {
	const snapPoints = useMemo(() => ['30%'], []);
	const navigation = useNavigation();
	const [demandes, setDemandes] = useState();

	const handleCloseBottomSheet = () => {
		if (ref && ref.current) {
			ref.current.close();
		}
	};

	const renderBackdrop = useCallback(
		(props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
		[]
	);

	useEffect(() => {
		SecureStore.getValue('user_info')
			.then((userInfo) => {
				userDemande = JSON.parse(userInfo);
				const headers = {
					'Accept': 'application/vnd.api+json',
					'Content-Type': 'application/vnd.api+json',
					'Authorization': `Bearer ${userDemande.token}`,
				}
				axios.get(process.env.EXPO_PUBLIC_API_URL + "cours/demandeAcceptee", { headers: headers })
					.then((response) => {
						setDemandes(response.data);
					})
					.catch((error) => console.log(error))
			});
	}, []);

	const estTuteur = () => {
		if (demandes !== undefined && Object.keys(demandes).length !== 0 && demandes[0].attributes.demande_accepte === 1) {
			return true;
		}
	}

	return (
		<BottomSheetModal
			ref={ref}
			snapPoints={snapPoints}
			backdropComponent={renderBackdrop}
			handleIndicatorStyle={{ backgroundColor: '#DFCCE4' }}
			backgroundStyle={{ backgroundColor: '#092D74' }}
		>
			<View style={styles.contentContainer}>
				<CustomButton
					text={"Donner vos disponibilités"}
					halfButton={false}
					style={styles.buttonSpace}
					onPress={() => {
						if (estTuteur()) {
							navigation.navigate("Disponibilités");
							handleCloseBottomSheet();
						}
						else {
							Alert.alert(
								"Attention",
								"Vous devez être un tuteur avant.",
								[
									{
										text: "OK",
										onPress: () => console.log("Cancel Pressed"),
										style: "cancel",
									},
								]
							);
							handleCloseBottomSheet();
						}
					}}
				/>
				<CustomButton
					text={"Faire une demande"}
					halfButton={false}
					style={styles.buttonSpace}
					onPress={() => {
						navigation.navigate("Liste des cours - Tuteur");
						handleCloseBottomSheet();
					}}
				/>
				<CustomButton
					text={"Annuler"}
					halfButton={false}
					style={styles.buttonSpace}
					onPress={() => {
						ref.current.close()
					}}
				/>
			</View>
		</BottomSheetModal>

	);
});

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 30
	},
	containerHeadline: {
		fontSize: 24,
		fontWeight: '600',
		padding: 20,
		color: 'white'
	},
	buttonSpace: {
		marginLeft: 10,
		backgroundColor: "red",
	},
});

export default CustomBottomSheetModalPageDemande;