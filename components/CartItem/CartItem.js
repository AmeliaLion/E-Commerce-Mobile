import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useImageStore } from "../../store/ImageStore";
import styles from './CartItem.styles';

export default function CartItem({ product }) {
  const { decrementCartItemQuantity, incrementCartItemQuantity, removeCartItem } = useImageStore();

  const handleDecrement = () => {
    if (product.Quantity > 1) {
      decrementCartItemQuantity(product.imdbID);
    } else {
      removeCartItem(product.imdbID);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cartLine}>
        <Image
          style={styles.image}
          source={{
            uri: product.Poster,
          }}
        />
        <View style={styles.cartDescription}>
          <Text style={styles.title}>{product.Title}</Text>
          <Text style={styles.price}>Price: R {product.Price}</Text>
          <View style={styles.buttonOpacityContainer}>
            <TouchableOpacity style={styles.buttonOpacity} onPress={() => incrementCartItemQuantity(product.imdbID)}>
              <Text>+</Text>
            </TouchableOpacity>
            {/* Moved here */}
            <Text style={styles.quantity}>      {product.Quantity}     </Text>
            <TouchableOpacity style={styles.buttonOpacity} onPress={handleDecrement}>
              <Text>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}