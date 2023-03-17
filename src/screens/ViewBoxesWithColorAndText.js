import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const ViewBoxesWithColorAndText = () => {
  const data = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' },
    { id: 5, text: 'Item 5' },
    { id: 6, text: 'Item 6' },
    { id: 7, text: 'Item 7' },
    { id: 8, text: 'Item 8' },
    { id: 9, text: 'Item 9' },
    { id: 10, text: 'Item 10' },
    { id: 11, text: 'Item 11' },
    { id: 8, text: 'Item 8' },
    { id: 9, text: 'Item 9' },
    { id: 10, text: 'Item 10' },
    { id: 11, text: 'Item 11' },
    { id: 12, text: 'Item 12' },
    { id: 12, text: 'Item 12' },
    { id: 8, text: 'Item 8' },
    { id: 9, text: 'Item 9' },
    { id: 10, text: 'Item 10' },
    { id: 11, text: 'Item 11' },
    { id: 12, text: 'Item 12' },
  ];
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={3}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
  },
  text: {
    fontSize: 20,
  },
});
export default ViewBoxesWithColorAndText;