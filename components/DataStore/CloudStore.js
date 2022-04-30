import { buildRequest } from './utils/buildRequest';

class CloudStore {
    constructor() {
        if (CloudStore._instance) {
            throw new Error('CloudStore already has an instance!!!');
        }
        CloudStore._instance = this;

        this.url =
            'https://pkpmv88l4k.execute-api.eu-west-2.amazonaws.com/prod';
        this.data = {};
    }

    getAllData = async (path, userId) => {
        try {
            const request = buildRequest('GET', { id: userId });
            console.log('request', request);

            await fetch(`${this.url + path}`, request);
        } catch {
            console.log('Error when getting data');
        }
        console.log('this.data', this.data);
        return this.data;
    };

    getData = async (path, userId) => {
        try {
            const url = `${this.url + path + '?id=' + userId}`;
            const response = await fetch(url);
            const result = await response.json();

            this.data = result.data;
            console.log('response', result);
        } catch (error) {
            // do notification of no data
            console.log('Error when getting data', error);
            console.log(String(error));
        }
        console.log('this.data', this.data);
        return this.data;
    };

    storeData = async (path, userId, data) => {
        try {
            await fetch(
                `${this.url + path}`,
                buildRequest('POST', { id: userId, data: data }),
            );
        } catch (error) {
            console.log('Unable to save data', error);
        }
    };
}

export default CloudStore;
