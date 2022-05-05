/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useMemo, useState, useCallback } from 'react';
import DataStore from '../DataStore';
import uuid from 'react-native-uuid';
import { cloneDeep } from 'lodash';

const store = new DataStore();

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [items, setItems] = useState(null);
    const [categories, setCategories] = useState([
        { label: 'Important', value: 1 },
        { label: 'Urgent', value: 2 },
        { label: 'Primary', value: 3 },
        { label: 'Secondary', value: 4 },
        { label: 'Notes', value: 5 },
        { label: 'Other', value: 6 },
    ]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [dataStore, setDataStore] = useState(store);
    const [path, setPath] = useState('/shopping-list');
    const [userId, setUserId] = useState('testing');
    const [syncData, setSyncData] = useState(false);
    const [getData, setGetData] = useState(true);
    const [itemToEdit, setItemToEdit] = useState(false);
    const [title, setTitle] = useState('Shopping List');
    const [isCloudSyncEnabled, setIsCloudSyncEnabled] = useState(false);

    const unassignedCategory = {
        label: 'Unassigned',
        value: 999,
    };

    const getCategoryName = (categoryString) => {
        return categoryString ? categoryString : unassignedCategory.label;
    };

    const handleCategoryDelete = (data, id) => {
        return data.filter((item) => item.id !== id);
    };

    const handleDelete = async (id, category) => {
        console.log('DELETING--', category, id);

        const newItems = cloneDeep(items);
        const newCategoryData = handleCategoryDelete(
            newItems[category.label],
            id,
        );
        if (newCategoryData.length === 0) {
            delete newItems[category.label];
        } else {
            newItems[category.label] = newCategoryData;
        }

        setItems(newItems);
        setSyncData(true);
    };

    const handleToggleComplete = async (id, category) => {
        console.log('TOGGLING', category, id);

        setItems((prevItems) => {
            return {
                ...prevItems,
                [category.label]: prevItems[category.label]
                    .map((item) =>
                        item.id === id ? { ...item, done: !item.done } : item,
                    )
                    .sort((a, b) => {
                        if (a.done) return 1;
                        if (b.done) return -1;
                        return 0;
                    }),
            };
        });
        setSyncData(true);
    };

    const handleAdd = async (name) => {
        const category = getCategoryName(selectedCategory?.label);
        console.log('ADDING--', category, name);
        setItems((prevItems) => {
            return {
                ...prevItems,
                [category]: [
                    ...(prevItems[category] ? prevItems[category] : []),
                    {
                        name,
                        id: uuid.v4(),
                        done: false,
                        category: selectedCategory || unassignedCategory,
                    },
                ],
            };
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
            itemToEdit,
            setItemToEdit,
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
            itemToEdit,
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
