import AsyncStorage from '@react-native-async-storage/async-storage';

const keyStoreUser = '@currentUser';

const storeDataUser = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(keyStoreUser, jsonValue);
    return true;
  } catch (e) {
    return false;
  }
};

const getDataUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(keyStoreUser);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return false;
  }
};

const removeDataUser = async () => {
  try {
    await AsyncStorage.removeItem(keyStoreUser);
    return true;
  } catch (e) {
    return false;
  }
};

export {storeDataUser, getDataUser, removeDataUser};
