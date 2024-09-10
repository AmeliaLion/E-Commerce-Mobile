import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useImageStore } from "../../store/ImageStore";
import styles from '../Cart/Cart.styles';
import CartItem from '../CartItem/CartItem';
import { Ionicons } from '@expo/vector-icons';

export default function Cart({ navigation }) {
  const { cart } = useImageStore();

  const handlePayment = () => {
    navigation.navigate("Pay", { msg: "From Cart Screen", totalPrice });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.Quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.Quantity * item.Price, 0).toFixed(2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart ({totalItems})</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {cart.length === 0 ? (
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        ) : (
          <View>
            {cart.map((product) => (
              <View key={product.imdbID} style={styles.contener}>
                <CartItem product={product} />
              </View>
            ))}
            
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total: ${totalPrice}</Text>
            </View>
            
            <TouchableOpacity
              onPress={handlePayment}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Proceed to Payment (${totalPrice})</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}