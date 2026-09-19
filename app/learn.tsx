
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, AppState} from 'react-native';
import { Portrait, portraits } from '../portraits';
import Flashcard from '../my_components/flashcard';
import { loadData, Item, storeLearned } from './async_functions';
import { useNavigation } from  'expo-router';
import { leaveApp, leavePage } from './functions'

export default function Learn() {

  const navigation = useNavigation();

  const appState = useRef(AppState.currentState);

  // Database
  const DATA: Portrait[] = portraits;

  // Stores the not-learned cards. Updates each time user learns a card
  // Shows the first item in this array
  const[values, setValues] = useState<Portrait[] | null>(null)

  // Stores portraits the user learned during a sesion. It is a temporary storage and it is saved to Async Storage 'learned' after user leaves the page
  const[learnedThisSess, setLearnedThisSess] = useState<Portrait[] | null>(null)

  // UseEffect - loads the data from async storage, creates an array of unlearned cards
  useEffect(() => {
  const handleLoad = async () => {
    const learnedPortraits = await loadData();
    const learnedIDs = new Set(learnedPortraits.map((portrait: Item) => portrait.id))
    const toLearn = DATA.filter((portrait: Portrait) => ! learnedIDs.has(portrait.id))
    setValues(toLearn)
  }
  handleLoad();
}, [])

// It saves all learned portraits from local useState to async storage
// It is used when user leaves the 'learn it' page
useEffect(leavePage(navigation, learnedThisSess), [navigation, learnedThisSess])

// Stores all the information from learnedThisSess to async storage when app goes to background state(user leaves the app)
useEffect( leaveApp(appState, learnedThisSess), [learnedThisSess])

// If there are values(cards) do this:
if (values !== null){

  const LearnIt = () => {
    if(learnedThisSess === null)
      setLearnedThisSess([values[0]])
    else{
      let learned = JSON.parse(JSON.stringify(learnedThisSess))
      learned.push(values[0]);
      setLearnedThisSess(learned);
    }
    let newValues = values.slice(1);
    setValues(newValues)
  
  console.log('these is updated values:', newValues, 'this is old varsion:', values)
 

}

const LearnLater = () => {
  let valuesCopy = JSON.parse(JSON.stringify(values))
  let end = valuesCopy.length;
  const firstItem = valuesCopy[0];
  valuesCopy[0] = valuesCopy[end - 1]
  valuesCopy[end - 1] = firstItem;
  setValues(valuesCopy)

  console.log('this is values with swapped items:', valuesCopy)
}

  if(values.length === 0){
    return(
      <View>
        <Text>Everything is learned</Text>
      </View>
    )
  }

  return(
    <View style={{flex: 1}}>
    <ScrollView>
        <Flashcard button1='learn it' button2='learn later' name={values[0].name} description={values[0].description} image={values[0].image} onPress1={LearnIt} onPress2={LearnLater}/>
    </ScrollView>
    </View>
  )
}
else{
  return(
    <View>
      <Text>Loading</Text>
    </View>
  )
}
}

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center'
   },
   text: {
     fontSize: 20,
     fontWeight: 'bold',
     margin: 10
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
    marginTop: '5%',
    width: '90%',
    height: 500,
    borderColor: '#48cae4',
    borderWidth: 3
  },
  
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backfaceVisibility: 'hidden',
    marginRight: '5%',
    marginLeft: '5%',
    width: '90%',
    height: 300
  },
  backText: {
    position: 'absolute',
    top: 0,
    marginRight: '5%',
    marginLeft: '5%',
    width: '90%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
  backgroundColor: 'gray',
    padding: 10,
    borderColor: 'black',
    borderWidth: 3
  }
 });

