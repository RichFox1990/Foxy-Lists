import React, { useState, useEffect } from 'react';
import uuid from 'react-native-uuid';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Header from './components/Header';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';
import LocalStore from './components/DataStore/LocalStore';
// import CloudStore from './components/DataStore/CloudStore';

const dataStore = new LocalStore();
const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('kappa');
    const getTheData = async () => {
      // console.log(await dataStore.getAllData());
      // await dataStore.removeItem('dave')
      const theData = await dataStore.getData('shopping');
      console.log('theData', theData);
      setItems(theData || []);
    };
    getTheData();
  }, []);

  useEffect(() => {
    const storeTheData = async () => {
      await dataStore.storeData('shopping', items);
      console.log('items', items);
    };
    if (items !== null) {
      storeTheData();
    }
  }, [items]);

  const handleDelete = async (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  };

  const handleToggleComplete = async (id) => {
    setItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      );
    });
  };

  const handleAdd = async (name) => {
    setItems((prevItems) => {
      return [...prevItems, { name, id: uuid.v4(), done: false }];
    });
  };

  return (
    <SafeAreaView style={styles.flex}>
      <TouchableWithoutFeedback
        style={styles.flex}
        onPress={() => Keyboard.dismiss()}>
        <View style={styles.flex}>
          <Header title="Shopping List" />
          <View style={styles.viewContainer}>
            <Image source={require('./img/fox.png')} style={styles.img} />
          </View>
          <AddItem onAdd={handleAdd} />
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <ListItem
                item={item}
                onDelete={handleDelete}
                toggleComplete={handleToggleComplete}
              />
            )}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewContainer: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewText: { color: 'crimson', fontSize: 30 },
  img: { width: 75, height: 75, borderRadius: 100 / 2 },
});

export default App;
