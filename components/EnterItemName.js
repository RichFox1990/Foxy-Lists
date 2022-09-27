import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";

export const EnterItemName = ({ textValue, onChange, defaultText }) => {
    const [isTextFocused, setIsTextFocused] = useState(false);


    return (
        <View style={styles.flex}>
            <TextInput
                numberOfLines={1}
                value={textValue}
                style={[
                    styles.textInput,
                    isTextFocused
                        ? styles.focusedBorder
                        : styles.defaultBorder,
                ]}
                onChangeText={(text) => onChange(text)}
                onFocus={() => setIsTextFocused(true)}
                onBlur={() => setIsTextFocused(false)} />
            {Boolean(!textValue) && (
                <View style={styles.placeholder} pointerEvents="none">
                    <Text style={styles.text}>{defaultText}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    defaultBorder: {
        borderColor: '#f5c6b0',
    },
    focusedBorder: {
        borderColor: '#f57b42',
    },
    flex: { flex: 1 },
    placeholder: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,
        fontSize: 15,
        zIndex: 99,
    },
    text: {
        color: 'grey',
    },
    textInput: {
        borderRadius: 50,

        flex: 1,
        color: 'black',
        margin: 5,
        borderWidth: 2,
        textAlign: 'center',
        padding: 7,
        backgroundColor: '#eee',
    },
});