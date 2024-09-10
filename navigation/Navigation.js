import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import ProductList from '../components/ProductList/ProductList';
import { useImageStore } from "../store/ImageStore";
import { Ionicons } from '@expo/vector-icons';
import AuthStack from '../components/Auth/AuthStack';
import Search from '../components/Auth/Search';
import Cart from '../components/Cart/Cart'; // Import the Cart component

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

export default function Navigation() {
  const { cart } = useImageStore();

  const cartQuantityCalculator = () => {
    return cart.reduce((total, item) => total + item.Quantity, 0);
  };

  const CartIcon = ({ navigation }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('CartStack')} 
      style={{ marginRight: 15 }}
    >
      <Ionicons name="cart-outline" size={24} color="black" />
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
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarShowLabel: true,
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
      {/* Home Screen */}
      <Tab.Screen
        name="Home"
        component={ProductList}
        options={{
          tabBarLabel: "Home",
          headerStyle: {
            backgroundColor: '#D0D1BF',
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      
      {/* Search Screen */}
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          headerStyle: {
            backgroundColor: '#D0D1BF',
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Likes Screen */}
      <Tab.Screen
        name="Likes"
        component={ProductList} // Replace with your Likes component
        options={{
          tabBarLabel: "Likes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Profile Screen */}
      <Tab.Screen
        name="Profile"
        component={AuthStack}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Hidden Cart Stack */}
      <Tab.Screen
        name="CartStack"
        component={CartStack}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  );
}