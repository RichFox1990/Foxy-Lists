import React, { useContext, useMemo } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { AppContext } from './DataStore/utils/appContext';

const ListItem = ({ item, renderHeaderText, categoryName }) => {
    const textStyles = {
        ...styles.listItemText,
        ...(item.done && styles.itemDone),
    };
    const opacity = {
        opacity: item.done ? 0.5 : 1,
    };
    const { handleDelete, handleToggleComplete } =
        useContext(AppContext);

    return (
        <TouchableOpacity style={styles.itemContainer}>
            {renderHeaderText && <Text>{categoryName}</Text>}
            <View style={{ ...styles.listItemView, ...opacity }}>
                <Text style={textStyles}>{item.name}</Text>
                <View style={styles.iconContainer}>
                    <Icon
                        style={styles.icon}
                        name={item.done ? 'check-circle' : 'check-circle-o'}
                        size={25}
                        color="green"
                        onPress={() => handleToggleComplete(item.id, categoryName)}
                    />
                    <Icon
                        style={styles.icon}
                        name="remove"
                        size={25}
                        color="firebrick"
                        onPress={() => handleDelete(item.id, categoryName)}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#eee',
        marginHorizontal: 5,
    },
    iconContainer: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 10,
    },
    listItemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listItemText: {
        color: 'grey',
        maxWidth: '80%',
        fontSize: 18,
        textTransform: 'capitalize',
    },
    itemDone: {
        textDecorationLine: 'line-through',
        opacity: 0.6,
    },
});

export default ListItem;
