import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Title, Snackbar } from 'react-native-paper';

import axios from 'axios';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  const handleContactUs = async () => {
    try {
      await axios.post('http://192.168.0.215:5000/api/contact', { name, email, message });
      setVisible(true);
      setError('');
    } catch (error) {
      setError('Error sending message');
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}>
     <Title style={styles.title}>Contact Us!</Title>
      <View style={styles.form}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Message"
          value={message}
          onChangeText={setMessage}
          style={styles.input}
          mode="outlined"
          multiline
        />
        <Button mode="contained" onPress={handleContactUs} style={styles.button}>
          Send Message
        </Button>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={Snackbar.DURATION_SHORT}
        >
          <Text>{error ? error : 'Message sent successfully!'}</Text> {/* Wrapped text in <Text> */}
        </Snackbar>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
});

export default ContactUs;