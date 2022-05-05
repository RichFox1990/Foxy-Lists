import ListItem from './ListItem';
import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from 'react-native';
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
                        })),
                    })),
            );
        }
    }, [items]);

    const renderHorizontalItem = (index, isSelected, item) => {
        return (
            <View style={styles.horizontalItemWrapper}>
                <View
                    style={
                        isSelected
                            ? [
                                  styles.itemContainer,
                                  styles.itemContainerSelected,
                              ]
                            : styles.itemContainer
                    }>
                    <Text>{item.title}</Text>
                </View>
            </View>
        );
    };

    const renderSectionHeader = (section) => {
        return (
            <TouchableWithoutFeedback>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{section.title}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    return listData ? (
        listData.length ? (
            <View style={styles.flex}>
                <SyncedList
                    renderSectionHeader={renderSectionHeader}
                    renderHorizontalItem={renderHorizontalItem}
                    data={listData}
                    horizontalListContainerStyle={
                        styles.horizontalListContainerStyle
                    }
                    verticalListProps={{
                        style: styles.verticalListContainerStyle,
                    }}
                    renderVerticalItem={(item) => {
                        return (
                            <ListItem
                                categoryName={item.category}
                                item={item}
                            />
                        );
                    }}
                />
            </View>
        ) : (
            <Text style={styles.noItemsText}>
                Add some items to get started...
            </Text>
        )
    ) : (
        <ActivityIndicator style={styles.loader} size="large" color="#f57b42" />
    );
};
const styles = StyleSheet.create({
    flex: { flex: 1 },
    horizontalListContainerStyle: {
        paddingHorizontal: 10,
    },

    header: {
        padding: 2,
        backgroundColor: '#f7dbcd',
    },
    headerText: {
        textAlign: 'center',
        color: 'black',
    },
    noItemsText: {
        textAlign: 'center',
        color: 'grey',
        opacity: 0.7,
    },
    itemContainer: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        marginBottom: 5,
    },

    itemContainerSelected: {
        borderBottomWidth: 2,
        borderBottomColor: '#f57b42',
    },
});
