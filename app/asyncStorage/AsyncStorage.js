import AsyncStorage from '@react-native-async-storage/async-storage';

const keyStoreUser = '@currentUser';
const keyStoreDarkMode = '@darkMode';

const setDataUserStorage = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(keyStoreUser, jsonValue);
    return true;
  } catch (e) {
    return false;
  }
};

const getDataUserStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(keyStoreUser);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return false;
  }
};

const removeDataUserStorage = async () => {
  try {
    await AsyncStorage.removeItem(keyStoreUser);
    return true;
  } catch (e) {
    return false;
  }
};

const setDarkModeStorage = async value => {
  try {
    await AsyncStorage.setItem(keyStoreDarkMode, value.toString());
    return true;
  } catch (e) {
    return false;
  }
};

const getDarkModeStorage = async () => {
  try {
    const value = await AsyncStorage.getItem(keyStoreDarkMode);
    return value;
  } catch (e) {
    return false;
  }
};

export {
  setDataUserStorage,
  getDataUserStorage,
  removeDataUserStorage,
  setDarkModeStorage,
  getDarkModeStorage
};
