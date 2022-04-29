import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const ListItem = ({ item, onDelete, toggleComplete }) => {
    const textStyles = {
        ...styles.listItemText,
        ...(item.done && styles.itemDone),
    };
    const opacity = {
        opacity: item.done ? 0.5 : 1,
    };

    return (
        <TouchableOpacity style={styles.itemContainer}>
            <View style={{ ...styles.listItemView, ...opacity }}>
                <Text style={textStyles}>{item.name}</Text>
                <View style={styles.iconContainer}>
                    <Icon
                        style={styles.icon}
                        name={item.done ? 'check-circle' : 'check-circle-o'}
                        size={25}
                        color="green"
                        onPress={() => toggleComplete(item.id)}
                    />
                    <Icon
                        style={styles.icon}
                        name="remove"
                        size={25}
                        color="firebrick"
                        onPress={() => onDelete(item.id)}
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
