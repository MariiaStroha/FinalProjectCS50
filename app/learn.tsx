import { useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { AppState, StyleSheet, Text, View } from "react-native";
import Flashcard from "../my_components/flashcard";
import { Portrait, portraits } from "../portraits";
import { Item, loadData } from "./async_functions";
import { leaveApp, leavePage } from "./helpers";
import useTheme from '../hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { createStyles  } from '../assets/images/styles/styles';


export default function Learn() {
  const { colors } = useTheme();

  const styles = createStyles(colors);

  const navigation = useNavigation();

  const appState = useRef(AppState.currentState);

  // Database
  const DATA: Portrait[] = portraits;

  // Stores the not-learned cards. Updates each time user learns a card
  // Shows the first item in this array
  const [values, setValues] = useState<Portrait[] | null>(null);

  // Stores portraits the user learned during a sesion. It is a temporary storage and it is saved to Async Storage 'learned' after user leaves the page
  const [learnedThisSess, setLearnedThisSess] = useState<Portrait[] | null>(
    null,
  );

  // UseEffect - loads the data from async storage, creates an array of unlearned cards
  useEffect(() => {
    const handleLoad = async () => {
      const learnedPortraits = await loadData();
      const learnedIDs = new Set(
        learnedPortraits.map((portrait: Item) => portrait.id),
      );
      const toLearn = DATA.filter(
        (portrait: Portrait) => !learnedIDs.has(portrait.id),
      );
      setValues(toLearn);
    };
    handleLoad();
  }, []);

  // It saves all learned portraits from local useState to async storage
  // It is used when user leaves the 'learn it' page
  useEffect(() => leavePage(navigation, learnedThisSess), [
    navigation,
    learnedThisSess,
  ]);

  // Stores all the information from learnedThisSess to async storage when app goes to background state(user leaves the app)
  useEffect(() => leaveApp(appState, learnedThisSess), [learnedThisSess]);

  // If there are values(cards) do this:
  if (values !== null) {
    const LearnIt = () => {
      if (learnedThisSess === null) setLearnedThisSess([values[0]]);
      else {
        let learned = JSON.parse(JSON.stringify(learnedThisSess));
        learned.push(values[0]);
        setLearnedThisSess(learned);
      }
      let newValues = values.slice(1);
      setValues(newValues);

      console.log(
        "these is updated values:",
        newValues,
        "this is old varsion:",
        values,
      );
    };

    const LearnLater = () => {
      const valuesCopy = JSON.parse(JSON.stringify(values));
      const newValues = [...valuesCopy.slice(1), valuesCopy[0]]
      setValues(newValues);

      console.log("this is values with swapped items:", valuesCopy);
    };

    if (values.length === 0) {
      return (
        <LinearGradient colors={colors.gradients.background} style={styles.container}>
          <View style={styles.containerEverythingIs}>
            <Text style={styles.textEverythingIs}>Everything is learned</Text>
          </View>
        </LinearGradient>
      );
    }

    return (
      <LinearGradient colors={colors.gradients.background} style={styles.container}>
        <View style={{flex: 1}}>     
            <Flashcard
              button1="learn it"
              button2="learn later"
              name={values[0].name}
              description={values[0].description}
              image={values[0].image}
              onPress1={LearnIt}
              onPress2={LearnLater}
            /> 
        </View>
      </LinearGradient> 
    );
  } else {
    return (
      <LinearGradient colors={colors.gradients.background} style={styles.container}>
        <View style={styles.containerEverythingIs}>
          <Text style={styles.textEverythingIs}>Loading</Text>
        </View>
      </LinearGradient>
    );
  }
}