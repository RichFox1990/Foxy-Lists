import React, { useContext } from 'react';
import { List } from './List';

import { cloneDeep } from 'lodash';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { AppContext } from './DataStore/utils/appContext';

const RecursiveCategoryLists = ({ items, isFirst }) => {
    const categories = Reflect.ownKeys(items);
    const categoryCount = categories.length;
    const currentCategory = categories[0];

    const SingleList = ({ category }) => {
        return (
            <List
                categoryName={category}
                categoryItems={items[category]}
                isFirst={isFirst}
            />
        );
    };

    const ListWithFooter = ({ category }) => {
        const categoryToRender = cloneDeep(items[category]);
        const newItems = cloneDeep(items);
        delete newItems[category];

        return (
            <List
                categoryName={category}
                categoryItems={categoryToRender}
                isFirst={isFirst}
                ListFooterComponent={
                    <RecursiveCategoryLists items={newItems} />
                }
            />
        );
    };

    if (categoryCount < 2) {
        return <SingleList category={currentCategory} />;
    }

    return <ListWithFooter category={currentCategory} />;
};

export const ListContainer = () => {
    const { items } = useContext(AppContext);
    return items ? (
        <RecursiveCategoryLists items={items} isFirst={true} />
    ) : (
        <ActivityIndicator style={styles.loader} size="large" color="#f57b42" />
    );
};

const styles = StyleSheet.create({
    flex: { flex: 1 },
    loader: {
        padding: 10,
    },
});
