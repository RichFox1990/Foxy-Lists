import React, { useEffect, useContext } from 'react';
import {
    StyleSheet,
    Image,
    View,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import Header from './components/Header';
import List from './components/List';
import AddItemContainer from './components/AddItemContainer';
import { AppContext } from './components/DataStore/utils/appContext';
import ToggleSwitch from './components/ToggleSwitch';

const App = () => {
    const {
        dataStore,
        items,
        setItems,
        title,
        setTitle,
        path,
        userId,
        getData,
        setGetData,
        syncData,
        setSyncData,
        handleAdd,
        toggleCloudSyncSwitch,
        isCloudSyncEnabled,
    } = useContext(AppContext);

    useEffect(() => {
        const fetchUserData = async () => {
            setTitle('loading...');
            const theData = await dataStore.getData(path, userId);
            setTitle('Shopping List');
            setItems(Object.keys(theData).length ? theData : {});
        };
        if (getData) {
            fetchUserData();
            setGetData(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getData]);

    // useEffect(() => {
    //     console.log('current items', items);
    // }, [items]);

    useEffect(() => {
        if (isCloudSyncEnabled) {
            console.log('||--- Enabling CloudSync ---||');
            setSyncData(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCloudSyncEnabled]);

    useEffect(() => {
        const storeTheData = async (saveInCloud) => {
            await dataStore.storeData(path, userId, items, saveInCloud);
            console.log('items', items);
        };
        if (syncData) {
            storeTheData(isCloudSyncEnabled);
            setSyncData(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [syncData]);

    return (
        <SafeAreaView style={styles.flex}>
            <TouchableWithoutFeedback
                style={styles.flex}
                onPress={() => Keyboard.dismiss()}>
                <View style={styles.flex}>
                    <Header title={title} />
                    <View style={styles.viewContainer}>
                        <ToggleSwitch
                            style={styles.toggle}
                            onColors={{ track: '#f5c6b0', thumb: '#f57b42' }}
                            offColors={{ track: '#767577', thumb: '#f5c6b0' }}
                            iconOn="cloud-upload-outline"
                            iconOff="cloud-offline-outline"
                            onToggle={toggleCloudSyncSwitch}
                            value={isCloudSyncEnabled}
                        />
                        <Image
                            source={require('./img/fox.png')}
                            style={styles.img}
                        />
                    </View>
                    <AddItemContainer onAdd={handleAdd} />
                    <List />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: 'white',
    },
    viewContainer: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewText: { color: 'crimson', fontSize: 30 },
    img: { width: 75, height: 75, borderRadius: 100 / 2 },
    loader: {
        padding: 10,
    },
    toggle: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
});

export default App;
