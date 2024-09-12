import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Title } from 'react-native-paper';

const PrivacyPolicy = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Privacy Policy</Title>
      <Text style={styles.text}>
        {/* Add your privacy policy text here */}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default PrivacyPolicy;