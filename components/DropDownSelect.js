import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AppContext } from './DataStore/utils/appContext';

const DropDownSelect = ({ data }) => {
    const [isFocused, setIsFocused] = useState(false);
    const { selectedCategory, setSelectedCategory } = useContext(AppContext);

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
            value={selectedCategory?.value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(item) => {
                item.value === selectedCategory?.value
                    ? setSelectedCategory(null)
                    : setSelectedCategory(item);
            }}
            renderRightIcon={() => (
                <FontAwesome5
                    style={styles.icon}
                    color={isFocused ? '#f57b42' : '#de855d'}
                    name="layer-group"
                    size={20}
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
        fontSize: 14,
        textAlign: 'center',
        color: 'black',
    },
    iconStyle: {},
    inputSearchStyle: {
        fontSize: 12,
    },
});
