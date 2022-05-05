import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import DropDownSelect from './DropDownSelect';
import { AppContext } from './DataStore/utils/appContext';

const AddItemContainer = () => {
    const { categories, handleAdd, selectedCategory, setSelectedCategory } =
        useContext(AppContext);
    const [text, setText] = useState('');
    const [isTextFocused, setIsTextFocused] = useState(false);

    const onAdd = () => {
        const textValue = text.trim().toLowerCase();
        if (textValue) {
            setText('');
            handleAdd(textValue);
        }
    };

    const handleChange = (textValue) => {
        setText(textValue);
    };

    const handleCategoryChange = (selection) => {
        selection?.value === selectedCategory?.value
            ? setSelectedCategory(null)
            : setSelectedCategory(selection);
    };

    return (
        <View>
            <View style={styles.enterRow}>
                <View style={styles.flex}>
                    <TextInput
                        numberOfLines={1}
                        value={text}
                        style={[
                            styles.textInput,
                            isTextFocused
                                ? styles.focusedBorder
                                : styles.defaultBorder,
                        ]}
                        onChangeText={handleChange}
                        onFocus={() => setIsTextFocused(true)}
                        onBlur={() => setIsTextFocused(false)}
                    />
                    {Boolean(!text) && (
                        <View style={styles.placeholder} pointerEvents="none">
                            <Text style={styles.text}>Enter New Item</Text>
                        </View>
                    )}
                </View>
                <DropDownSelect
                    data={categories}
                    flex={0.4}
                    onChange={handleCategoryChange}
                    currentValue={selectedCategory}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.addButtonContainer}
                    onPress={onAdd}>
                    <FontAwesome name="plus" size={25} style={styles.icon} />
                    <Text style={styles.buttonText}>Add Item</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    defaultBorder: {
        borderColor: '#f5c6b0',
    },
    focusedBorder: {
        borderColor: '#f57b42',
    },
    flex: { flex: 1 },
    enterRow: {
        flexDirection: 'row',
    },
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
    buttonContainer: { flexDirection: 'row' },
    // disabledButton: {
    //     backgroundColor: '#964b27',
    // },
    addButtonContainer: {
        // borderRadius: 50,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f57b42',
        marginVertical: 5,
        marginBottom: 10,
        paddingVertical: 10,
    },
    buttonText: {
        color: 'black',
    },
    icon: {
        paddingRight: 5,
        color: 'black',
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

export default AddItemContainer;
