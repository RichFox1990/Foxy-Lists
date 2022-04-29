import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const ToggleSwitch = ({
    onToggle,
    value,
    labelText,
    onColors,
    offColors,
    iconOn,
    iconOff,
    iconSize = 25,
    style,
}) => {
    return (
        <View style={{ ...styles.viewContainer, ...style }}>
            {labelText && <Text>{labelText}</Text>}
            <Switch
                style={styles.switch}
                trackColor={{ false: offColors.track, true: onColors.track }}
                thumbColor={value ? onColors.thumb : offColors.thumb}
                onValueChange={onToggle}
                value={value}
            />
            <Icon
                style={styles.icon}
                name={value ? iconOn : iconOff}
                size={iconSize}
                color={value ? 'green' : 'red'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    viewContainer: {
        padding: 3,
        flexDirection: 'row',
    },
    icon: {
        marginRight: 5,
    },
});

export default ToggleSwitch;
