import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Title, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleSignin = async () => {
    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.215:5000/api/auth/login', { email, password });

      if (response.data) {
        login(response.data);
        setVisible(true);
        setTimeout(() => {
          navigation.navigate('Home');
        }, 2000);
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during signin:', error);
      setError('An error occurred during signin');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Welcome Back!</Title>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={handleSignin} style={styles.button}>
        Sign In
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={Snackbar.DURATION_SHORT}
      >
        Login Successful!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#1e88e5',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 12,
  },
});

export default SignIn;