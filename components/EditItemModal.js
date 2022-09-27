import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppContext } from './DataStore/utils/appContext';
import DropDownSelect from './DropDownSelect';
import Modal from 'react-native-modal';
import { ConfirmCancelButtons } from './ConfirmCancelButtons';

const EditItemModal = () => {
    const { itemToEdit, setItemToEdit, categories, handleEditItem } = useContext(AppContext);
    const [newCategory, setNewCategory] = useState(itemToEdit.category);

    useEffect(() => {
        setNewCategory(itemToEdit.category);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemToEdit]);

    const handleOnCategoryChange = (selection) => {
        selection?.value === newCategory?.value
            ? setNewCategory(null)
            : setNewCategory(selection);
    };
    return (
        <Modal
            isVisible={Boolean(itemToEdit)}
            onBackdropPress={() => setItemToEdit(false)}
            onBackButtonPress={() => setItemToEdit(false)}
            backdropTransitionOutTiming={1}>
            <View style={styles.modalContainer}>
                <Text style={styles.text}>Editing: "{itemToEdit.name}"</Text>
                <View style={styles.modalView}>
                    <DropDownSelect
                        data={categories}
                        currentValue={newCategory}
                        onChange={handleOnCategoryChange}
                        />
                    <ConfirmCancelButtons onConfirm={() => handleEditItem(itemToEdit, "category", newCategory)} onCancel={() => setItemToEdit(false)}/>
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
        color: 'black',
    },
    modalContainer: {
        borderRadius: 15,
        borderColor: '#f57b42',
        borderWidth: 2,
        overflow: 'hidden',
        elevation: 20,
    },
    modalView: {
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
});

export default EditItemModal;
