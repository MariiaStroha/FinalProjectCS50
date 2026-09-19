import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Portrait, portraits } from '../portraits';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomePage() {
  let { id } =  useLocalSearchParams<{id: string}>();
  const ID = Number(id);
  const portrait = portraits.find((person: Portrait) => person.id === ID);
  return(
    <>
    <SafeAreaView  style={{flex: 1}}>
    <ScrollView>
       <Stack.Screen options={{ title: portrait?.name}}/>
       <View style={styles.title}>
           <Text style={styles.text}> {portrait?.name} </Text>
        </View>
        <Image
          source={ portrait?.image }
          style={styles.image}
        />
        <View style={{ margin: 15, alignItems: 'center', justifyContent: 'flex-end'}}>
          <Text style={styles.text}>{ portrait?.description }</Text>
        </View>
      </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    padding: 20,
    backgroundColor: '#48cae4',
    borderTopLeftRadius: 55,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 55
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 55,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 55,
    marginRight: '5%',
    marginLeft: '5%',
    width: '90%',
    height: 500,
    borderColor: '#48cae4',
    borderWidth: 3
  }
});