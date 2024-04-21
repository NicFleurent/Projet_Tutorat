import * as SecureStore from 'expo-secure-store';

export const save = async (key, value) => {
    try {
        let preparedDataToSave;
        if(typeof myVar !== 'string'){
            preparedDataToSave = JSON.stringify(value);
        }
        else{
            preparedDataToSave = value;
        }
        SecureStore.setItemAsync(key, preparedDataToSave);
      } catch (error) {
        throw new Error(error.message);
      }
};

export const getValue = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result;
    } else {
        console.log('No values stored under that key.');
    }
};