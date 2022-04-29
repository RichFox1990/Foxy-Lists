import React, { useContext } from 'react';
import { FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import ListItem from './ListItem';
import { AppContext } from './DataStore/utils/appContext';

const List = () => {
    const { items, handleDelete, handleToggleComplete } =
        useContext(AppContext);

    return items ? (
        <FlatList
            data={items}
            renderItem={({ item }) => (
                <ListItem
                    item={item}
                    onDelete={handleDelete}
                    toggleComplete={handleToggleComplete}
                />
            )}
        />
    ) : (
        <ActivityIndicator style={styles.loader} size="large" color="#f57b42" />
    );
};

const styles = StyleSheet.create({
    loader: {
        padding: 10,
    },
});

export default List;
