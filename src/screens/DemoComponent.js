import React, {useState} from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';

const DemoComponent = (navigation) => {
  const data = [
    { title: 'Section 1', data: ['Item 1', 'Item 2', 'Item 3'] },
    { title: 'Section 2', data: ['Item 4', 'Item 5', 'Item 6'] },
    { title: 'Section 3', data: ['Item 7', 'Item 8', 'Item 9', 'Item 10'] },
  ];

  return (
    <SectionList
      sections={data}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Text style={styles.text}>{item}</Text>}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    backgroundColor: '#e0e0e0',
    padding: 10,
  },
});

export default DemoComponent;