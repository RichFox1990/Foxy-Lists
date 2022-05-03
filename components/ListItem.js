import React, { useContext, useState } from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { AppContext } from './DataStore/utils/appContext';

const ListItem = ({ item }) => {
    const { handleDelete, handleToggleComplete, setItemToEdit } =
        useContext(AppContext);

    const [isPressed, setIsPressed] = useState(false);
    const [isLongPress, setIsLongPress] = useState(false);

    const onToggleComplete = () => {
        handleToggleComplete(item.id, item.category);
    };
    const onDelete = () => {
        handleDelete(item.id, item.category);
    };
    return (
        <Pressable
            style={[styles.itemContainer, isPressed && styles.pressed]}
            onLongPress={() => setIsLongPress(true)}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => {
                setItemToEdit(isLongPress ? item : false);
                setIsPressed(false);
                setIsLongPress(false);
            }}>
            <View style={[styles.listItemView, item.done && styles.opacity]}>
                <Text
                    style={[styles.listItemText, item.done && styles.itemDone]}>
                    {item.name}
                </Text>
                <View style={styles.iconContainer}>
                    <Icon
                        style={styles.icon}
                        name={item.done ? 'check-circle' : 'check-circle-o'}
                        size={25}
                        color="green"
                        onPress={onToggleComplete}
                    />
                    <Icon
                        style={styles.icon}
                        name="remove"
                        size={25}
                        color="firebrick"
                        onPress={onDelete}
                    />
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    header: {
        padding: 2,
        backgroundColor: '#f7dbcd',
        // borderWidth: 1,
        // borderColor: 'grey',
        textAlign: 'center',
        color: 'black',
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
        flexGrow: 1,
        textTransform: 'capitalize',
    },
    itemDone: {
        textDecorationLine: 'line-through',
        opacity: 0.5,
    },
    opacity: {
        opacity: 0.5,
    },
    pressed: {
        opacity: 0.5,
        backgroundColor: '#f0efd5',
    },
});

export default ListItem;
