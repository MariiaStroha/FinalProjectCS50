import React, { useCallback, useEffect, useState, useRef} from 'react';
import { Link } from 'expo-router';
import { Text, Pressable, View, AppState } from 'react-native';
import { loadStreak, resetStreak, Streak } from "../async_functions";
import { getDate } from "../helpers";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router'
import useTheme from '../../hooks/useTheme';
import { createStyles  } from '../../assets/images/styles/styles'
import { LinearGradient } from 'expo-linear-gradient';
import { Eye } from 'lucide-react-native';
import { GraduationCap} from 'lucide-react-native';
 

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

  const { colors } = useTheme();

  const homeStyles = createStyles(colors);

  const appState = useRef(AppState.currentState);

  // Stores the user's streak
  const [currentStreak, setCurrentStreak] = useState<Streak | null>(null);

  // This use state triggers a rerender only when the streak needs to be reset
  // It's a simple integer and iy updates(+ 1) when reset is needed
  const[needReset, setNeedReset] = useState(0)

  // This useEffect monitores app state and triggers a check(if the streak needs to be reset)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if(nextAppState === 'active'){
      if(currentStreak !== null && currentStreak.lastReview !== null &&
         currentStreak.lastReview  < getDate(new Date(Date.now() - 24 * 60 * 60 * 1000))){
          setNeedReset(number => number + 1)
         }
      }
         appState.current = nextAppState
      }
    );
      return () => {
        subscription.remove();
      }}, [currentStreak])

  // Runs each time the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const handlestreakload = async() =>{
      let theCurrentStreak: Streak | null = await loadStreak();
      if (theCurrentStreak !== null){
        // If the last review was earlier than yesterday the streak resets
        if(theCurrentStreak.lastReview !== null && theCurrentStreak.lastReview < getDate(new Date(Date.now() - 24 * 60 * 60 * 1000))){
          await resetStreak();
          theCurrentStreak.currentStreak = 0;
        }
      }

      // When user opens the app for the first time and the object does not exist in async storage yet
      else{
        theCurrentStreak = {
          currentStreak: 0,
          bestStreak: 0,
          lastReview: null
        }
        // It sets the streak to the initial values and then saves it to async storage
        try{
          await AsyncStorage.setItem('streak', JSON.stringify(theCurrentStreak));
        }
        catch (e) {
          console.error(e); 
        }
      }

      // Saves the streak to usestate to be rendered
      if(isActive)
        setCurrentStreak(theCurrentStreak);
    }

  handlestreakload();

  return() => {
    isActive = false;
  };
  }, [needReset])
);

  if(currentStreak !== null){
  return (
      <>
      <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <View style={homeStyles.header}>
        <Text style={homeStyles.title}> Current Streak:  { currentStreak.currentStreak} </Text>
        <Text style={homeStyles.title}> Best Streak:  { currentStreak.bestStreak }</Text>
      </View>
      <View style={homeStyles.buttonWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.button}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          >
          <Link
            href={{
              pathname: '../learn',
            }}
            asChild>
            <Pressable style={homeStyles.buttonTextContainer} onPress={get}>
              <Text style={homeStyles.buttonText}> Learn new portraits </Text>
            </Pressable>
          </Link>
            <Eye
              size={56}
              style={homeStyles.icon}
              color={colors.text}
            />
        </LinearGradient>
         <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.button}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          >
          <Link
            href={{
              pathname: '../review',
            }}
            asChild>
            <Pressable style={homeStyles.buttonTextContainer} onPress={get}>
              <Text style={homeStyles.buttonText}> Review portraits </Text>
            </Pressable>
            </Link>
            <GraduationCap
              size={56}
              style={homeStyles.icon}
              color={colors.text}
            />
            </LinearGradient>
            </View>
            </LinearGradient>
            </>   
  );
}
else{
  return(
    <View>
      <Text> Loading....</Text>
    </View>
  )
}
}