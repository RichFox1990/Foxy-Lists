import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AsyncStorage } from 'react-native';
import { buildRequest } from './utils/buildRequest';

class DataStore {
    constructor() {
        if (DataStore._instance) {
            throw new Error('LocalStore already has an instance!!!');
        }
        DataStore._instance = this;
        this.data = {};
        this.cloudUrl =
            'https://pkpmv88l4k.execute-api.eu-west-2.amazonaws.com/prod';
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

    getData = async (path, userId) => {
        try {
            this.data = await AsyncStorage.getItem(userId).then(
                (resp) => (this.data = JSON.parse(resp)),
            );
            console.log('||--- LOCAL DATA LOADED ---||', this.data);
            return this.data;
        } catch {
            console.log('Error when getting data');
        }
        throw new Error('Kappa');
    };

    storeDataInCloud = async (path, userId, data) => {
        try {
            await fetch(
                `${this.cloudUrl + path}`,
                buildRequest('POST', { id: userId, data: data }),
            );
            console.log('||--- CLOUD DATA SAVED ---||');
        } catch (error) {
            console.log('Unable to save data to the Cloud', error);
        }
    };

    storeData = async (path, userId, data, saveInCloud) => {
        try {
            console.log('||--- Saving data locally ---||');
            await AsyncStorage.setItem(userId, JSON.stringify(data));
            console.log('||--- SAVED ---||');
        } catch (error) {
            // handle better
            console.log('Unable to save local data', error);
        }
        if (saveInCloud) {
            console.log(
                '||--- CloudSync is enabled: Saving data to the cloud... ---||',
            );
            this.storeDataInCloud(path, userId, data);
        }
    };
}

export default DataStore;
