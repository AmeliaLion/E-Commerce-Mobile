import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './Product.styles';

export default function Product({ product, onCartClick }) {
  const [modalVisible, setModalVisible] = useState(false);

  // Generate a stable price based on the product's ID
  const generatePrice = (id) => {
    const basePrice = 75;
    const maxPrice = 300;
    const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (basePrice + (seed % (maxPrice - basePrice))).toFixed(2);
  };

  product.Price = generatePrice(product.imdbID);

  const handleAddToCart = () => {
    onCartClick(product);
    Alert.alert('Success', `${product.Title} added to cart!`);
  };

  const imageUrl = product.Poster !== 'N/A' ? product.Poster : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          style={styles.image}
          source={{ uri: imageUrl }}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.title} numberOfLines={2}>{product.Title}</Text>
          <Text style={styles.price}>R{product.Price}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={styles.modalImage}
              source={{ uri: imageUrl }}
              resizeMode="contain"
            />
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{product.Title}</Text>
              <Text style={styles.modalInfo}>Year: {product.Year}</Text>
              <Text style={styles.modalInfo}>Type: {product.Type}</Text>
              <Text style={styles.modalPrice}>R{product.Price}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <AntDesign name="close" size={20} color="white" />
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonAdd]}
                onPress={handleAddToCart}
              >
                <AntDesign name="shoppingcart" size={20} color="white" />
                <Text style={styles.buttonText}>Add To Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}