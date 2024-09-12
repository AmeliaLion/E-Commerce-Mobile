import React, { useContext, useState } from 'react';
import { Pressable, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import ProductList from '../components/ProductList/ProductList';
import { useImageStore } from "../store/ImageStore";
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import AuthStack from '../components/Auth/AuthStack';
import Search from '../components/Auth/Search';
import Cart from '../components/Cart/Cart';
import Profile from '../components/Profile/Profile';
import ChangePassword from '../components/Profile/ChangePassword';
import MyOrders from '../components/Profile/MyOrders';
import TermsAndConditions from '../components/Profile/TermsAndConditions';
import PrivacyPolicy from '../components/Profile/PrivacyPolicy';
import AboutUs from '../components/Profile/AboutUs';
import ContactUs from '../components/Profile/ContactUs';
import { AuthContext } from '../context/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CartStack = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerShown: false,
    }}
  >
    <Stack.Screen name="CartScreen" component={Cart} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerShown: false,
    }}
  >
    <Stack.Screen name="ProfileScreen" component={Profile} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
    <Stack.Screen name="MyOrders" component={MyOrders} />
    <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <Stack.Screen name="AboutUs" component={AboutUs} />
    <Stack.Screen name="ContactUs" component={ContactUs} />
  </Stack.Navigator>
);

const Navigation = () => {
  const { cart } = useImageStore();
  const { logout } = useContext(AuthContext);
  const [isPressed, setIsPressed] = useState(false);

  const cartQuantityCalculator = () => {
    return cart.reduce((total, item) => total + item.Quantity, 0);
  };

  const CartIcon = ({ navigation }) => (
    <Pressable 
      onPress={() => {
        setIsPressed(true);
        navigation.navigate('Cart');
        setTimeout(() => setIsPressed(false), 200); 
      }} 
      style={{ marginRight: 15 }}
    >
      <Ionicons name="cart-outline" size={24} color={isPressed ? 'purple' : 'black'} />
      {cartQuantityCalculator() > 0 && (
        <View style={{
          position: 'absolute',
          right: -6,
          top: -3,
          backgroundColor: 'red',
          borderRadius: 7,
          width: 14,
          height: 14,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {cartQuantityCalculator()}
          </Text>
        </View>
      )}
    </Pressable>
  );

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          color = focused ? 'purple' : color; 

          if (route.name === 'Products') {
            iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Cart') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user-o';
            return <FontAwesome name={iconName} size={size} color={color} />;
          }
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          color: 'black', 
        },
        tabBarActiveTintColor: 'purple', 
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          borderRadius: 20,
          position: 'absolute',
          margin: 10,
        },
        headerRight: () => <CartIcon navigation={navigation} />,
      })}
    >
      <Tab.Screen name="Products" component={ProductList} />
      <Tab.Screen name="Cart" component={CartStack} /> 
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default Navigation;