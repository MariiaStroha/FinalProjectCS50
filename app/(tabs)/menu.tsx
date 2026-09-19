import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
 
 export default function HomePage() {
   return (
     <View style={styles.container}>
       <Text style={styles.text}>This is the menu</Text>
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
   },
   text: {
     fontSize: 20,
     fontWeight: 'bold',
   },
 });