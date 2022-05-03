import React, { useState, useContext } from 'react';
import { StyleSheet, TextInput, Text, View, Modal } from 'react-native';
import { AppContext } from './DataStore/utils/appContext';
import DropDownSelect from './DropDownSelect';

const EditItemModal = ({ item }) => {
    const { setItemToEdit, categories } = useContext(AppContext);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            onDismiss={() => setItemToEdit(false)}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.text}>Editing: "{item.name}"</Text>
                    <DropDownSelect data={categories} />
                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        paddingVertical: 10,
        backgroundColor: '#f5c6b0',
        borderBottomWidth: 2,
        borderColor: '#f57b42',
    },
    modalContainer: {
        flex: 0.5,
        margin: 15,
        marginTop: '65%',
        // alignItems: 'center',
    },
    modalView: {
        overflow: 'hidden',
        flex: 1,
        backgroundColor: '#f8f8f8',
        elevation: 20,
        // borderRadius: 25,
        borderColor: '#f57b42',
        borderWidth: 2,
    },
});

export default EditItemModal;
