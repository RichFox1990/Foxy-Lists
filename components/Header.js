import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Icon name="shopping-basket" size={25} color="white" />
      <Text style={styles.text}>{title}</Text>
      <Icon name="shopping-basket" size={25} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: '#f57b42',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    color: 'black',
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Header;
