import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const AddItem = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleAdd = () => {
    const textValue = text.trim().toLowerCase();
    if (textValue) {
      onAdd(textValue);
      setText('');
    }
  };

  const handleChange = (textValue) => {
    setText(textValue);
  };

  return (
    <View>
      <View>
        {Boolean(!text) && (
          <View style={styles.placeholder} pointerEvents="none">
            <Text style={styles.text}>Enter New Item</Text>
          </View>
        )}
        <TextInput
          numberOfLines={1}
          value={text}
          style={styles.textInput}
          onChangeText={handleChange}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButtonContainer} onPress={handleAdd}>
          <Icon name="plus" size={25} style={styles.icon} />
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    margin: 5,
    opacity: 0.5,
    fontSize: 15,
    zIndex: 99,
  },
  text: {
    color: 'grey',
  },
  buttonContainer: { flexDirection: 'row' },
  addButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f57b42',
    margin: 5,
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
    color: 'black',
    margin: 5,
    borderWidth: 2,
    borderColor: '#f57b42',
    textAlign: 'center',
    padding: 7,
    backgroundColor: '#eee',
  },
});

export default AddItem;
