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
    const [userId, setUserId] = useState('fds');
    const [syncData, setSyncData] = useState(false);
    const [getData, setGetData] = useState(true);
    const [title, setTitle] = useState('Shopping List');
    const [isCloudSyncEnabled, setIsCloudSyncEnabled] = useState(false);

    const getCategoryName = (categoryString) => {
        return categoryString ? categoryString : 'Unassigned';
    };

    const handleDelete = async (id, categoryName) => {
        const category = getCategoryName(categoryName)
        console.log("DELETING--", category, id)
        setItems((prevItems) => {
            return {
                ...prevItems,
                [category]: prevItems[category].filter(
                    (item) => item.id !== id,
                ),
            };
        });
        setSyncData(true);
    }

    const handleToggleComplete = async (id, categoryName) => {
        const category = getCategoryName(categoryName)
        console.log("TOGGLING", category, id)

        setItems((prevItems) => {
            return {
                ...prevItems,
                [category]: prevItems[category].map((item) =>
                    item.id === id ? { ...item, done: !item.done } : item,
                ),
            };
        });
        setSyncData(true);
    }

    const handleAdd = async (name) => {
        const category = getCategoryName(selectedCategory?.label)
        console.log("ADDING--", category, name)
        setItems((prevItems) => {
            return {
                ...prevItems,
                [category]: [
                    ...(Boolean(prevItems[category]) ? prevItems[category] : []),
                    { name, id: uuid.v4(), done: false },
                ],
            };
        });
        setSyncData(true);
    }

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
