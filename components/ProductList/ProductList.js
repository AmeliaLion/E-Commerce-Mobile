import React, { useEffect } from 'react';
import searchImages from '../../api';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'; // Ensure TouchableOpacity is imported
import { useImageStore } from "../../store/ImageStore";
import styles from '../ProductList/ProductList.style';
import Product from '../Product/Product';

export default function ProductList() {
  const { images, setImages } = useImageStore();
  const { cart, setCart, incrementCartItemQuantity } = useImageStore();

  useEffect(() => {
    console.log(cart, '');
  });

  const addToCart = (product) => {
    if (cart.some(item => item.imdbID === product.imdbID)) {
      var object = cart.find((item) => {
        return item.imdbID === product.imdbID;
      });
      incrementCartItemQuantity(object.imdbID);
    } else {
      product.Quantity = 1;
      setCart(product);
    }
  }

  const getImages = async (term) => {
    const result = await searchImages("thriller");
    setImages(result["Search"]);
  };

  if (images.length === 0) {
    getImages("thriller");
  }

  return (
    <ScrollView style={styles.contener}>
      <View style={styles.productListContener}>
        {
          images.map((product) => {
            return (
              <Product key={product["imdbID"]} product={product} onCartClick={addToCart} style={styles.productList}></Product>
            )
          })
        }
      </View>
    </ScrollView>
  )
}
