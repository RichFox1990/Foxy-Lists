import React, { createContext, useMemo, useState } from 'react';
import DataStore from '../DataStore';
import uuid from 'react-native-uuid';

const store = new DataStore();

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [items, setItems] = useState(null);
    const [dataStore, setDataStore] = useState(store);
    const [path, setPath] = useState('/shopping-list');
    const [userId, setUserId] = useState('0');
    const [syncData, setSyncData] = useState(false);
    const [getData, setGetData] = useState(true);
    const [title, setTitle] = useState('Shopping List');
    const [isCloudSyncEnabled, setIsCloudSyncEnabled] = useState(false);

    const handleDelete = async (id) => {
        setItems((prevItems) => {
            return prevItems.filter((item) => item.id !== id);
        });
        setSyncData(true);
    };

    const handleToggleComplete = async (id) => {
        setItems((prevItems) => {
            return prevItems.map((item) =>
                item.id === id ? { ...item, done: !item.done } : item,
            );
        });
        setSyncData(true);
    };

    const handleAdd = async (name) => {
        setItems((prevItems) => {
            return [...prevItems, { name, id: uuid.v4(), done: false }];
        });
        setSyncData(true);
    };

    const toggleCloudSyncSwitch = () =>
        setIsCloudSyncEnabled((previousState) => !previousState);

    const value = useMemo(
        () => ({
            handleAdd,
            handleDelete,
            handleToggleComplete,
            toggleCloudSyncSwitch,
            items,
            setItems,
            dataStore,
            setDataStore,
            path,
            setPath,
            userId,
            setUserId,
            syncData,
            setSyncData,
            getData,
            setGetData,
            title,
            setTitle,
            isCloudSyncEnabled,
        }),
        [
            items,
            dataStore,
            path,
            userId,
            syncData,
            getData,
            title,
            isCloudSyncEnabled,
        ],
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
