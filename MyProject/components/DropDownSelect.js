import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

const DropDownSelect = () => {
    const [value, setValue] = useState(null);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Dropdown
            style={[
                styles.dropdown,
                isFocused ? styles.focusedBorder : styles.defaultBorder,
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Group"
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(item) => {
                setValue(item.value);
            }}
            renderRightIcon={() => (
                <FontAwesome5
                    style={styles.icon}
                    color={isFocused ? '#f57b42' : '#de855d'}
                    name="layer-group"
                    size={25}
                />
            )}
        />
    );
};

export default DropDownSelect;

const styles = StyleSheet.create({
    defaultBorder: {
        borderColor: '#f5c6b0',
    },
    focusedBorder: {
        borderColor: '#f57b42',
    },
    dropdown: {
        borderRadius: 50,
        borderWidth: 2,
        margin: 5,
        flex: 0.4,
        backgroundColor: '#eee',
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 12,
        textAlign: 'center',
        opacity: 0.5,
        color: 'grey',
    },
    selectedTextStyle: {
        fontSize: 12,
        textAlign: 'center',
        color: 'black',
    },
    iconStyle: {},
    inputSearchStyle: {
        fontSize: 12,
    },
});
