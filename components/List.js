import ListItem from './ListItem';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { AppContext } from './DataStore/utils/appContext';
import { SyncedList } from '@georstat/react-native-synced-list';
export const List = () => {
    const [listData, setListData] = useState([]);
    const { items } = useContext(AppContext);

    useEffect(() => {
        if (items) {
            setListData(
                Object.entries(items)
                    .filter(([, categoryData]) => categoryData.length > 0)
                    .map(([index, categoryData]) => ({
                        id: index,
                        title: index,
                        data: categoryData.map((data) => ({
                            ...data,
                            category: index,
                        })),
                    })),
            );
        }
    }, [items]);

    const renderSectionHeader = (section) => {
        return (
            <TouchableWithoutFeedback style={styles.header}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{section.title}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    return (
        <>
            {listData && (
                <SyncedList
                    renderSectionHeader={renderSectionHeader}
                    data={listData}
                    horizontalListContainerStyle={
                        styles.horizontalListContainerStyle
                    }
                    renderVerticalItem={(itemThing) => {
                        return (
                            <ListItem
                                categoryName={itemThing.category}
                                item={itemThing}
                            />
                        );
                    }}
                />
            )}
        </>
    );
};
const styles = StyleSheet.create({
    flex: { flex: 1 },
    horizontalListContainerStyle: {
        padding: 10,
    },
    header: {
        padding: 2,
        backgroundColor: '#f7dbcd',
        // borderWidth: 1,
        // borderColor: 'grey',
    },
    headerText: {
        textAlign: 'center',
        color: 'black',
    },
});
