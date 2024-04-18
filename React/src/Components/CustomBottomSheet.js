import { View, StyleSheet, Text, Button } from 'react-native';
import React, { forwardRef, useMemo } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import CustomButton from './CustomButton';

const CustomBottomSheetModal = React.forwardRef((props, ref) => {
	const snapPoints = useMemo(() => ['30%'], []);

	return (

		<BottomSheetModal
			ref={ref}
			index={0}
			snapPoints={snapPoints}
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
					}}
				/>
				<CustomButton
					text={"Faire une demande"}
					halfButton={false}
					style={styles.buttonSpace}
					onPress={() => {
						navigation.navigate("Disponibilites");
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
		paddingTop:30
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

export default CustomBottomSheetModal;