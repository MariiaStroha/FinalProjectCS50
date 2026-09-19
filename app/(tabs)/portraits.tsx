import React, { useState} from 'react';
import { Link } from 'expo-router';
import { StyleSheet, Text, FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Portrait, portraits} from '../../portraits';
import { SearchBar } from '@rneui/themed';

const renderItems = ({item}:{item: Portrait}) =>{
  return(
      <Link
      style={styles.link}
       href={{
          pathname: '../[id]',
          params: { id: item.id }
        }}
        asChild>
          <Pressable >
              <Text style={styles.container}>{ item.name} </Text>
          </Pressable>
        </Link>
  )
}



export default function DataBase(){
  const[search, setSearch] = useState('');

  const data: Portrait[] = portraits;

  const[result, setResult] = useState(data);

  const update = (search: string) =>{

    setSearch(search);

    let text = search.toLowerCase();

    setResult(data.filter((person)=>(person.name.toLowerCase().includes(text))))
  }

  return(
    <>
     <SafeAreaView style={styles.container}>
       <View style={styles.search}>
        <SearchBar
          placeholder="Знайти портрет"
          onChangeText={update}
          value={search}
        />
      </View>
      {result.length === 0 ? <Text>No match</Text> : 
      <FlatList
          data={result }
          renderItem={renderItems}
        />}
         </SafeAreaView>
      </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    
  },
  link: {
    backgroundColor: '#48cae4',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderColor: 'black',
    borderWidth: 3,
    padding: 20,
    margin: 20,
  },
  search:{
    width: '80%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  }
});