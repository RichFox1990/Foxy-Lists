import React, { useState } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import Modal from 'react-native-modal';
import { ConfirmCancelButtons } from './../ConfirmCancelButtons';

export const ConfirmDeleteModal = ({ onClose, onConfirm, item, isVisible }) => {
    const defaultAnimation = 'zoomOut';
    const [outAnimation, setOutAnimation] = useState(defaultAnimation);

    const handleOnClose = (modeOfClose) => {
        if (modeOfClose === 'Confirm') {
            setOutAnimation('slideOutUp');
            onConfirm();
        } else if (modeOfClose === 'Cancel') {
            setOutAnimation('flipOutX');
        } else {
            setOutAnimation(defaultAnimation);
        }
        onClose();
    };

    return (
        <Modal
            animationIn={'zoomIn'}
            animationOut={outAnimation}
            backdropColor="black"
            hasBackdrop
            backdropTransitionOutTiming={1}
            onBackButtonPress={() => handleOnClose('BackButton')}
            onBackdropPress={() => handleOnClose('Backdrop')}
            isVisible={isVisible}>
            <View style={styles.modalView}>
                <Text style={styles.textTitle}>
                    Are you sure you want to delete this item?
                </Text>
                {Object.entries(item).map(([key, data], idx) => {
                    if (key === 'done') {
                        data = data ? 'true' : 'false';
                    }
                    if (key === 'category') {
                        data = data.label;
                    }
                    if (key === 'id') return;
                    return (
                        <View
                            key={`${key}${idx}`}
                            style={styles.itemTextContainer}>
                            <Text style={styles.textItemTitle}>{key}: </Text>
                            <Text style={styles.text}>{data}</Text>
                        </View>
                    );
                })}
                <ConfirmCancelButtons onConfirm={() => handleOnClose('Confirm')} onCancel={() => handleOnClose('Cancel')} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    textTitle: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10,
        backgroundColor: '#f7dbcd',
        paddingVertical: 5,
        borderBottomWidth: 2,
        borderColor: '#f57b42',
        color: 'black',
    },
    textItemTitle: {
        textAlign: 'center',
        fontSize: 16,
        color: 'grey',
    },
    itemTextContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
    },
    text: {
        textAlign: 'center',
        fontStyle: 'italic',
        color: 'red',
        fontSize: 16,
    },
    modalView: {
        borderRadius: 15,
        borderColor: '#f57b42',
        borderWidth: 2,
        backgroundColor: '#f8f8f8',
        elevation: 20,
        overflow: 'hidden',
    },
});
