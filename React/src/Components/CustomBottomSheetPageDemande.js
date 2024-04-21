import { View, StyleSheet} from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';

const CustomBottomSheetModalPageDemande = React.forwardRef((props, ref) => {
	const snapPoints = useMemo(() => ['30%'], []);
	const navigation = useNavigation();

	const handleCloseBottomSheet = () => {
		if (ref && ref.current) {
			ref.current.close();
		}
	};

	const renderBackdrop = useCallback(
		(props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
		[]
	);

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
						navigation.navigate("Disponibilites");
						handleCloseBottomSheet();
					}}
				/>
				<CustomButton
					text={"Faire une demande"}
					halfButton={false}
					style={styles.buttonSpace}
					onPress={() => {
						navigation.navigate("ListeCours"); 
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