import React, { useContext } from 'react';
import { List } from './List';

import lodash from 'lodash'
import {
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { AppContext } from './DataStore/utils/appContext';

const RecursiveCategoryLists = ({ items }) => {
    const categories = Reflect.ownKeys(items)
    const categoryCount = categories.length
    const currentCategory = categories[0]

    const SingleList = ({ category }) => {
        return (
            <List
                categoryName={category}
                categoryItems={items[category]}
            />
        )
    }

    const ListWithFooter = ({ category }) => {
        const categoryToRender = lodash.cloneDeep(items[category]);
        const newitems = lodash.cloneDeep(items)
        delete newitems[category]

        return (
            <List
                categoryName={category}
                categoryItems={categoryToRender}
                ListFooterComponent={<RecursiveCategoryLists items={newitems}
                />}
            />
        )
    }

    if (categoryCount < 2) {
        return <SingleList category={currentCategory} />
    }

    return (
        <ListWithFooter category={currentCategory} />
    )
}


export const ListContainer = () => {
    const { items } =
        useContext(AppContext);
    return items ? (
        <RecursiveCategoryLists items={items} />
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
