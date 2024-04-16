import React, { useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';

const BottomActionMenu = ({ title, options, cancelButtonIndex, destructiveButtonIndex }) => {
  let actionSheet = useRef();

  const showActionSheet = () => {
    actionSheet.current.show();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>{title}</Text>
        <TouchableHighlight
          style={styles.buttonStyle}
          onPress={showActionSheet}>
          <Text style={styles.buttonTextStyle}>Open Bottom ActionSheet</Text>
        </TouchableHighlight>
        <Text style={styles.titleStyle}>www.aboutreact.com</Text>
        <ActionSheet
          ref={actionSheet}
          title={title}
          options={options}
          cancelButtonIndex={cancelButtonIndex}
          destructiveButtonIndex={destructiveButtonIndex}
          onPress={(index) => {
            alert(options[index]);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default BottomActionMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#307ecc',
    padding: 16,
  },
  buttonStyle: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: '#f5821f',
    marginTop: 30,
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
  },
  titleStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
  },
});
