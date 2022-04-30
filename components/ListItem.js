import React, { useContext, useMemo } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { AppContext } from './DataStore/utils/appContext';
import DropDownSelect from './DropDownSelect';

const ListItem = ({ item, renderHeaderText, categoryName }) => {
    const { handleDelete, handleToggleComplete, categories } =
        useContext(AppContext);

    return (<>
        {renderHeaderText && <TouchableWithoutFeedback><Text style={styles.header}>{categoryName}</Text></TouchableWithoutFeedback>}
        <TouchableOpacity style={styles.itemContainer}>
            <View style={[styles.listItemView, (item.done && styles.opacity)]}>
                <Text style={[styles.listItemText, (item.done && styles.itemDone)]}>{item.name}</Text>
                    {/* <DropDownSelect data={categories} /> */}
                <View style={styles.iconContainer}>

                    <Icon
                        style={styles.icon}
                        name={item.done ? 'check-circle' : 'check-circle-o'}
                        size={25}
                        color="green"
                        onPress={() => handleToggleComplete(item.id, categoryName)}
                    />
                    <Icon
                        style={styles.icon}
                        name="remove"
                        size={25}
                        color="firebrick"
                        onPress={() => handleDelete(item.id, categoryName)}
                    />
                </View>
            </View>
        </TouchableOpacity ></>

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
        // borderWidth: 1,
        // borderColor: 'grey',
        textAlign: 'center',
        color: 'black',

    },
    iconContainer: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 10,
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
        wordBreak: 'break-all',
    },
    itemDone: {
        textDecorationLine: 'line-through',
        opacity: 0.5,
    },
    opacity: {
        opacity: 0.5,
    }
});

export default ListItem;
