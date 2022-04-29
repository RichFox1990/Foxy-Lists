import React, { useContext } from 'react';
import {
    FlatList,
    StyleSheet,
    ActivityIndicator,
    SafeAreaView,
    Text,
} from 'react-native';
import ListItem from './ListItem';
import { AppContext } from './DataStore/utils/appContext';

const List = ({
    categoryItems,
    handleDelete,
    handleToggleComplete,
    ListFooterComponent,
}) => {
    return (
        <>
            <Text>Hello</Text>
            <FlatList
                data={categoryItems}
                renderItem={({ item }) => (
                    <ListItem
                        item={item}
                        onDelete={handleDelete}
                        toggleComplete={handleToggleComplete}
                    />
                )}
                ListFooterComponent={ListFooterComponent}
            />
        </>
    );
};

const ListContainer = () => {
    // store or filter by each group
    // render each group

    // over arching container in SafeAreaView
    // map over each category and its data use ListFooterComponent to nest the next one over and over
    const { items, handleDelete, handleToggleComplete } =
        useContext(AppContext);
    console.log('itemsssss', items);
    return items ? (
        <SafeAreaView>
            <List
                categoryItems={items?.Unassigned}
                handleDelete={handleDelete}
                handleToggleComplete={handleToggleComplete}
                // ListFooterComponent={
                //     <List
                //         categoryItems={items?.Unassigned}
                //         handleDelete={handleDelete}
                //         handleToggleComplete={handleToggleComplete}
                //     />
                // }
            />
        </SafeAreaView>
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

export default ListContainer;
