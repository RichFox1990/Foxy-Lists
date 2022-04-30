import React, { createContext, useMemo, useState, useCallback } from 'react';
import DataStore from '../DataStore';
import uuid from 'react-native-uuid';

const store = new DataStore();

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [items, setItems] = useState(null);
    const [categories, setCategories] = useState([
        { label: 'Important', value: 1 },
        { label: 'Other', value: 2 },
    ]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [dataStore, setDataStore] = useState(store);
    const [path, setPath] = useState('/shopping-list');
    const [userId, setUserId] = useState('0');
    const [syncData, setSyncData] = useState(false);
    const [getData, setGetData] = useState(true);
    const [title, setTitle] = useState('Shopping List');
    const [isCloudSyncEnabled, setIsCloudSyncEnabled] = useState(false);

    const getCategory = () => {
        return selectedCategory ? selectedCategory.label : 'Unassigned';
    };

    const handleDelete = useCallback(
        async (id) => {
            const category = getCategory();

            setItems((prevItems) => {
                return {
                    ...prevItems,
                    [category]: prevItems[category].filter(
                        (item) => item.id !== id,
                    ),
                };
            });
            setSyncData(true);
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedCategory],
    );

    const handleToggleComplete = useCallback(
        async (id) => {
            const category = getCategory();

            setItems((prevItems) => {
                return {
                    ...prevItems,
                    [category]: prevItems[category].map((item) =>
                        item.id === id ? { ...item, done: !item.done } : item,
                    ),
                };
            });
            setSyncData(true);
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedCategory],
    );

    const handleAdd = useCallback(
        async (name) => {
            const category = getCategory();
            setItems((prevItems) => {
                return {
                    ...prevItems,
                    [category]: [
                        ...(prevItems[category] && prevItems[category]),
                        { name, id: uuid.v4(), done: false },
                    ],
                };
            });
            setSyncData(true);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedCategory],
    );

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
            categories,
            setCategories,
            selectedCategory,
            setSelectedCategory,
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
            categories,
            selectedCategory,
            handleAdd,
            handleDelete,
            handleToggleComplete,
        ],
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
