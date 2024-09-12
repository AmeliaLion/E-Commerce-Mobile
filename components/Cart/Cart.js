import React, { useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useImageStore } from "../../store/ImageStore";
import styles from '../Cart/Cart.styles';
import CartItem from '../CartItem/CartItem';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { handlePayment } from '../../utils/payment';

export default function Cart() {
  const { cart } = useImageStore();
  const navigation = useNavigation();

  const user = {
    firstName: "Sinovuyo",
    lastName: "Sikhisi",
    email: "sinovuyoshakes@gmail.com"
  };

  const totalItems = cart.reduce((sum, item) => sum + item.Quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.Quantity * item.Price, 0).toFixed(2);

  useEffect(() => {
    const handleUrlChange = (event) => {
      if (event.url.includes('return=http://store.example.com')) {
        navigation.navigate('Cart');
      }
    };

    const linkingListener = Linking.addEventListener('url', handleUrlChange);

    return () => {
      linkingListener.remove();
    };
  }, [navigation]);

  const proceedToPayment = async () => {
    try {
      const paymentUrl = await handlePayment(cart, totalPrice, user);
      if (paymentUrl) {
        Linking.openURL(paymentUrl);
      } else {
        console.error('Failed to get payment URL');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart  [ {totalItems} ]</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {cart.length === 0 ? (
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        ) : (
          <View>
            {cart.map((product) => (
              <View key={product.imdbID} style={styles.cartItemContainer}>
                <CartItem product={product} />
              </View>
            ))}
            
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total: R{totalPrice}</Text>
            </View>
            
            <TouchableOpacity
              onPress={proceedToPayment}
              style={styles.button}
            >
              <Text style={styles.buttonText}>  Checkout R {totalPrice}</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => Linking.openURL('https://sandbox.payfast.co.za/eng/recurring/update/')}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Update Card for Subscription</Text>
            </TouchableOpacity> */}
          </View>
        )}
      </ScrollView>
    </View>
  );
}