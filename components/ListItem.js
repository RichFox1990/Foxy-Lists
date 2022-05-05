import React, { useContext, useState } from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { AppContext } from './DataStore/utils/appContext';
import { ConfirmDeleteModal } from './Modal/ConfirmDeleteModal';

const ListItem = ({ item }) => {
    const { handleDelete, handleToggleComplete, setItemToEdit } =
        useContext(AppContext);

    const [isPressed, setIsPressed] = useState(false);
    const [deleteModalActive, setDeleteModalActive] = useState(false);

    const onToggleComplete = () => {
        handleToggleComplete(item.id, item.category);
    };
    const onClickDelete = () => {
        if (item.done) {
            handleDelete(item.id, item.category);
        } else {
            setDeleteModalActive(true);
        }
    };
    const onDeleteConfirm = () => {
        setDeleteModalActive(false);
        handleDelete(item.id, item.category);
    };

    const onLongPress = () => {
        setItemToEdit(item);
    };

    return (
        <>
            <Pressable
                style={[
                    styles.itemContainer,
                    isPressed && styles.pressed,
                    item.done && { backgroundColor: 'rgba(66, 163, 5,0.1)' },
                ]}
                onLongPress={onLongPress}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => {
                    setIsPressed(false);
                }}>
                <View
                    style={[styles.listItemView, item.done && styles.opacity]}>
                    <Text
                        style={[
                            styles.listItemText,
                            item.done && styles.itemDone,
                        ]}>
                        {item.name}
                    </Text>
                    <View style={styles.iconContainer}>
                        <FontAwesome
                            style={styles.icon}
                            name={item.done ? 'check-circle' : 'check-circle-o'}
                            size={25}
                            color="green"
                            onPress={onToggleComplete}
                        />
                        <Entypo
                            style={styles.icon}
                            name="circle-with-cross"
                            size={25}
                            color="firebrick"
                            onPress={onClickDelete}
                        />
                    </View>
                </View>
            </Pressable>
            <ConfirmDeleteModal
                item={item}
                onClose={() => setDeleteModalActive(false)}
                onConfirm={onDeleteConfirm}
                isVisible={deleteModalActive}
            />
        </>
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
        textAlign: 'center',
        color: 'black',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginLeft: 15,
        height: '100%',
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
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
});

export default ListItem;
