import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AsyncStorage } from 'react-native';

class LocalStore {
  constructor() {
    if (LocalStore._instance) {
      throw new Error('LocalStore already has an instance!!!');
    }
    LocalStore._instance = this;

    this.data = {};
  }

  getAllData = async () => {
    let allKeys;
    try {
      allKeys = await AsyncStorage.getAllKeys();
    } catch (error) {
      console.log('Error when getting data', error);
    } finally {
      return allKeys;
    }
  };

  getData = async (key = 'shopping') => {
    try {
      this.data = await AsyncStorage.getItem(key).then(
        (resp) => (this.data = JSON.parse(resp)),
      );
    } catch {
      console.log('Error when getting data');
    }
    console.log('this.data', this.data);
    return this.data;
  };

  removeItem = async (key = 'shopping') => {
    try {
      this.data = await AsyncStorage.removeItem(key).then(
        console.log('deleted data', this.data),
      );
    } catch {
      console.log('Error when getting data');
    }
    return this.data;
  };

  storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log('Unable to save data', error);
    }
  };
}

export default LocalStore;
