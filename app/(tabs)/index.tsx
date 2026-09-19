import React from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, Pressable, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
 

const get = async () => {
 /* try{
   await AsyncStorage.clear()
    }
    catch(e){
      console.error(e);
    }
  }  */
   let info = await AsyncStorage.getItem('learned')
 if(info !== null){
 const data = JSON.parse(info)
 console.log('THIS IS ASYNC STORAGE:', data)
 }  
}

  
export default function HomePage() {
  return (
    <>
    <View style={styles.container}>
     <Link
        style={styles.link}
          href={{
            pathname: '../learn',
          }}
          asChild>
          <Pressable onPress={get}>
            <Text style={styles.container}> Learn new portraits </Text>
          </Pressable>
          </Link>
         <Link
        style={styles.link}
          href={{
            pathname: '../review',
          }}
          asChild>
          <Pressable onPress={get}>
            <Text style={styles.container}> Review portraits </Text>
          </Pressable>
          </Link>
           </View>
          </>   
  );
}

const styles = StyleSheet.create({
  link: {
    backgroundColor: '#48cae4',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderColor: 'black',
    borderWidth: 3,
    padding: 20,
    margin: 20,},

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});