import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput, Button, Dimensions } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';
import { Ionicons, MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Profile = () => {
  const { user, logout, updateUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      console.log('User data:', user); // Debugging line
      setName(user.name || '');
      setEmail(user.email || '');
      setProfilePicture(user.profilePicture || '');
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const response = await axios.put('http://192.168.0.215:5000/api/auth/update', { name, email, profilePicture });
      updateUser(response.data.user);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleImagePicker = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setProfilePicture(source.uri);
      }
    });
  };

  const renderAvatar = () => {
    if (profilePicture) {
      return <Avatar.Image size={120} source={{ uri: profilePicture }} />;
    } else if (name) {
      const initial = name.charAt(0).toUpperCase();
      return <Avatar.Text size={120} label={initial} />;
    } else {
      return <Avatar.Text size={120} label="?" />;
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>User not logged in</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileHeader}>
        {renderAvatar()}
        {isEditing ? (
          <>
            <TouchableOpacity onPress={handleImagePicker}>
              <Text style={styles.uploadText}>Upload Profile Picture</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
            />
            <Button title="Save" onPress={handleSave} />
          </>
        ) : (
          <>
            {/* <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Ionicons name="pencil" size={20} color="purple" />
            </TouchableOpacity> */}
          </>
        )}
      </View>

      {/* Display logged-in user's name */}
      <View style={styles.loggedInUserContainer}>
        <Text style={styles.loggedInUserText}>{user.name}</Text>
      </View>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        <MenuOption icon={<MaterialIcons name="shopping-bag" size={24} color="purple" />} title="My orders" onPress={() => navigation.navigate('MyOrders')} />
        <MenuOption icon={<Ionicons name="lock-closed" size={24} color="purple" />} title="Change password" onPress={() => navigation.navigate('ChangePassword')} />
        <MenuOption icon={<MaterialIcons name="description" size={24} color="purple" />} title="Terms & conditions" onPress={() => navigation.navigate('TermsAndConditions')} />
        <MenuOption icon={<Ionicons name="document-text" size={24} color="purple" />} title="Privacy policy" onPress={() => navigation.navigate('PrivacyPolicy')} />
        <MenuOption icon={<Ionicons name="information-circle" size={24} color="purple" />} title="About us" onPress={() => navigation.navigate('AboutUs')} />
        <MenuOption icon={<Ionicons name="call" size={24} color="purple" />} title="Contact us" onPress={() => navigation.navigate('ContactUs')} />
        <MenuOption icon={<AntDesign name="logout" size={24} color="purple" />} title="Logout" onPress={logout} />
      </View>
    </ScrollView>
  );
};

// Component for menu options
const MenuOption = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.menuOption} onPress={onPress}>
    <View style={styles.menuIcon}>{icon}</View>
    <Text style={styles.menuTitle}>{title}</Text>
    <FontAwesome name="chevron-right" size={20} color="#ccc" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  profileEmail: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
    textAlign: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: width * 0.25, // adjust based on the Avatar size and screen width
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
    width: '80%',
    textAlign: 'center',
  },
  uploadText: {
    color: 'blue',
    marginVertical: 10,
  },
  loggedInUserContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  loggedInUserText: {
    fontSize: 16,
    color: 'gray',
  },
  menuContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingVertical: 10,
    width: '100%',
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

export default Profile;
