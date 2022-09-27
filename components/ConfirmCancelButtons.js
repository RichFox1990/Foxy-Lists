import React from 'react';
import { Button, StyleSheet, View } from "react-native"


export const ConfirmCancelButtons = ({onConfirm, onCancel}) => {
    return (
        <View style={styles.buttonContainer}>
            <Button
                onPress={onConfirm}
                title="Confirm"
                color="green"
                accessibilityLabel="Learn more about this purple button"
            />
            <Button
                onPress={onCancel}
                title="Cancel"
                color="red"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 10,
        marginTop: 15,
    }
})