import { useState} from 'react';
import { Link } from 'expo-router';
import { Text, FlatList, Pressable, View, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Portrait, portraits} from '../../portraits';
import { createStyles  } from '../../assets/images/styles/styles'
import { Search } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import useTheme from '../../hooks/useTheme';


export default function DataBase(){
  
const { colors } = useTheme();

const styles = createStyles(colors);

const renderItems = ({item}:{item: Portrait}) =>{
  return(
    <LinearGradient
              colors={colors.gradients.surface}
              style={styles.button}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              >
    <View style={styles.buttonWrapper}>
      <Link
       href={{
          pathname: '../[id]',
          params: { id: item.id }
        }}
        asChild>
          <Pressable  style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>{ item.name} </Text>
          </Pressable>
        </Link>
      </View>
      </LinearGradient>
  )
}

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
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
     <SafeAreaView>
       <View style={styles.searchBarWrapper}>
        <Search
          size={25}
          style={styles.searchIcon}
          color={colors.textMuted}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Знайти портрет"
          placeholderTextColor={colors.textMuted}
          onChangeText={update}
          value={search}
        />
      </View>
      {result.length === 0 ? <Text style={styles.noMatch}>No match</Text> : 
      <FlatList
          data={result }
          renderItem={renderItems}
        />}
         </SafeAreaView>
         </LinearGradient>
      </>
  )
}