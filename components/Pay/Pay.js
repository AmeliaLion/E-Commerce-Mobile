import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight,ScrollView,Image, TouchableOpacity } from 'react-native';


export default function Pay({ route }) {
  return (
    <Text>
        {route.params.msg}
    </Text>
  )
}
