import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { TextInput, Button, Text, Title, Snackbar } from 'react-native-paper';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const ChangePassword = () => {
  const { user } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      setVisible(true);
      return;
    }

    try {
      await axios.put('http://192.168.0.215:5000/api/auth/change-password', {
        email: user.email,
        currentPassword,
        newPassword,
      });
      setVisible(true);
      setError('');
    } catch (error) {
      setError('Error changing password');
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}>
     <Title style={styles.title}>Change Password!</Title>
      <View style={styles.form}>
        <TextInput
          label="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          style={styles.input}
          mode="outlined"
          secureTextEntry
        />
        <TextInput
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          style={styles.input}
          mode="outlined"
          secureTextEntry
        />
        <TextInput
          label="Confirm New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          mode="outlined"
          secureTextEntry
        />
        <Button mode="contained" onPress={handleChangePassword} style={styles.button}>
          Change Password
        </Button>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={Snackbar.DURATION_SHORT}
        >
          <Text>{error ? error : 'Password changed successfully!'}</Text> {/* Wrapped text in <Text> */}
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

export default ChangePassword;