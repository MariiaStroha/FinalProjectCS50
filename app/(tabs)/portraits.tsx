import { useState} from 'react';
import { Link } from 'expo-router';
import { Text, FlatList, Pressable, View, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Portrait, portraits} from '../../portraits';
import { createStyles  } from '../../assets/images/styles/styles'
import { SearchBar } from '@rneui/themed';
import { Search } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import useTheme from '../../hooks/useTheme';



/*

const renderItems = ({item}:{item: Portrait}) =>{
  return(
    <View style={styles.buttonWrapper}>
            <LinearGradient
              colors={colors.gradients.surface}
              style={styles.button}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              ></LinearGradient>
      <Link
       href={{
          pathname: '../[id]',
          params: { id: item.id }
        }}
        asChild>
          <Pressable >
              <Text>{ item.name} </Text>
          </Pressable>
        </Link>
      </View>
  )
}



export default function DataBase(){
  const { colors } = useTheme();

  const styles = createStyles(colors);

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
     <SafeAreaView>
      <LinearGradient colors={colors.gradients.background} style={styles.container}>
       <View>
        <Search/>
        <TextInput
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
        </LinearGradient>
         </SafeAreaView>
      </>
  )
}

*/