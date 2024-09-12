import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, Modal } from 'react-native'; // Ensure TouchableOpacity is imported
import { AntDesign, FontAwesome } from '@expo/vector-icons';
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

  // Format price with commas and always show two decimal places
  const formattedPrice = parseFloat(product.Price).toLocaleString('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const handleAddToCart = () => {
    onCartClick(product);
  };

  const imageUrl = product.Poster !== 'N/A' ? product.Poster : 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: imageUrl }}
            resizeMode="cover"
          />
          <View style={styles.gradient}>
            <Text style={styles.title} numberOfLines={2}>{product.Title}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.price}>R{formattedPrice}</Text>
          <Text style={styles.year}>{product.Year}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}
      >
        <AntDesign name="shoppingcart" size={20} color="white" />
        <Text style={styles.addToCartButtonText}>Add To Cart</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
            <Image
              style={styles.modalImage}
              source={{ uri: imageUrl }}
              resizeMode="contain"
            />
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{product.Title}</Text>
              <Text style={styles.modalInfo}>Year: {product.Year}</Text>
              <Text style={styles.modalInfo}>Type: {product.Type}</Text>
              <Text style={styles.modalPrice}>R{formattedPrice}</Text>
            </View>
            <TouchableOpacity
              style={styles.modalAddToCartButton}
              onPress={handleAddToCart}
            >
              <AntDesign name="shoppingcart" size={20} color="white" />
              <Text style={styles.buttonText}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}