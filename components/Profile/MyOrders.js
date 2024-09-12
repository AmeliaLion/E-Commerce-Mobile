import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://192.168.0.215:5000/api/orders/${user.id}`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user]);

  const renderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text>Order ID: {item.id}</Text>
      <Text>Total: ${item.total}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  orderItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default MyOrders;