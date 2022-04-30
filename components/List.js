import ListItem from './ListItem';
import React from 'react';
import {
    FlatList,
    StyleSheet,
} from 'react-native';


export const List = ({
    categoryName,
    categoryItems,
    ListFooterComponent,
}) => {
    return (
        <FlatList
            data={categoryItems}
            renderItem={({ item, index }) => (
                <ListItem
                    renderHeaderText={index === 0}
                    categoryName={categoryName}
                    item={item}
                />
            )}
            ListFooterComponent={ListFooterComponent}
        />
    );
};