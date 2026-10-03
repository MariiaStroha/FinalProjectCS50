import { useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { AppState, ScrollView, StyleSheet, Text, View } from "react-native";
import Flashcard from "../my_components/flashcard";
import { Portrait, portraits } from "../portraits";
import { Item, loadData, loadStreak, Streak, updateStreak } from "./async_functions";
import { getDate, leaveApp, leavePage } from "./helpers";

// time units declaration
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;

export default function Review() {
  // The same logic as in learn: page shows the first item in array(usestate) and mutates the first item of the array
  // User presses got it - review date changes based on alghortim(based on its box). stores in local stotrage, then moves to async after vuser closes the page
  // User presses missed it - the card moves to box 1. gets deleted from the local array and moves to reviewed ths sess(the same for both missed it and got it)
  // the array of all loaded data should be constantly monitored - it shoudl update if a card's review date comes during the user's session

  const navigation = useNavigation();

  const appState = useRef(AppState.currentState);

  const DATA: Portrait[] = portraits;

  // Declares the array of id timers(will be handy when user leaves the screen = all the timers set for notDue should be deleted)
  const idsForTimers = useRef<number[]>([]);

  // Stores all the cards which are due to review
  // Similar to learn, the screen shows the first item of this array
  // Equivalent of values in Learn page
  const [toReview, setToReview] = useState<Item[] | null>(null);

  // Stores the cards which are NOT due to review. Evey item of this array has a timer
  // If the review time comes during user's session, the card will be deleted from this array and moved to toReview(the end)
  const notDue = useRef<Item[]>([]);

  // Here are all the cards which were reviewed this sess (both triggered by misssed it and got it button - the only thing that changes is the box and review date)
  const [reviewedThisSess, setReviewedThisSess] = useState<Item[] | null>(null);

  // Hooks for streak
  // this hook checks if the streak was already updated that day
  const [wasUpdatedToday, setWasUpdatedToday] = useState(false);

  // loads the data (learned from async storage)
  // filters based on review date and sets notDue and toReview
  useEffect(() => {
    const handleLoad = async () => {
      const learnedPortraits = await loadData();
      const dueToReview = learnedPortraits.filter(
        (item: Item) => item.reviewDate <= Date.now(),
      );
      // Leaves only items whichever review date is today
      const notDueItems = learnedPortraits.filter(
        // check so that thi item also is not in due to review array
        (item: Item) => item.reviewDate < Date.now() + 12 * hour && item.reviewDate > Date.now()
      );
      setToReview(dueToReview);
      // Sets timer for each item in notDue array
      notDueItems.forEach((item: Item) => {
        const time = item.reviewDate - Date.now();
        const id = setTimeout(() => {
          setToReview((prev) => [...(prev ?? []), item]);
          const updated = notDue.current.filter(
            (notDueItem: Item) => notDueItem.id !== item.id,
          );
          notDue.current = updated;
          console.log("TIMER HAS JUST WORKED");
        }, time);
        idsForTimers.current.push(id);
      });
      notDue.current = notDueItems;
    };
    handleLoad();
    return () => {
      idsForTimers.current.forEach((id) => {
        clearTimeout(id);
      });
    };
  }, []);

  // Stores all reviewed cards to async storage when user leaves the page
  useEffect(() => leavePage(navigation, reviewedThisSess), [
    navigation,
    reviewedThisSess,
  ]);

  // Stores all reviewed cards to async storage when user leaves the app
  useEffect(() => leaveApp(appState, reviewedThisSess), [reviewedThisSess]);

  // This useEffect loads the currentStreak from asyncStorage
  useEffect(() => {
    const handleStreakLoad = async () => {
      const theCurrentStreak = await loadStreak();
      
      if (theCurrentStreak.lastReview === getDate())
         setWasUpdatedToday(true);
    };
    handleStreakLoad();
  }, []);

  // If there are cards which are due to review
  if (toReview !== null) {
    // If there are no cards/ evrything is reviewed
    if (toReview.length === 0) {
      return (
        <View style={{ flex: 1 }}>
          <Text> No review cards for now </Text>
        </View>
      );
    }

    // Finds a corresponding item in portraits.db
    const currentItem = DATA.find(
      (item: Portrait) => item.id === toReview[0].id,
    );

    // Just sanity check
    if (currentItem === undefined) {
      return (
        <View>
          <Text>Portrait does not exist in DB</Text>
        </View>
      );
    }

    const GotIt = () => {
      // Saves everything to a variable(state can't be mutated directly)
      const itemToReview = toReview[0];

      // Changes the box and sets next review date
      if (itemToReview.box === 0) {
        itemToReview.reviewDate = Date.now() + day;
        itemToReview.box = 1;
      } else if (itemToReview.box === 1) {
        itemToReview.reviewDate = Date.now() + 3 * day;
        itemToReview.box = 2;
      } else if (itemToReview.box === 2) {
       itemToReview.reviewDate = Date.now() + week;
        itemToReview.box = 3;
      } else if (itemToReview.box === 3) {
        itemToReview.reviewDate = Date.now() + 2 * week;
        itemToReview.box = 4;
      } else if (itemToReview.box === 4) {
        itemToReview.reviewDate = Date.now() + 30 * day;
        itemToReview.box = 5;
      } else {
        itemToReview.reviewDate = Date.now() + 60 * day;
        itemToReview.box = 6;
      }

      // This is similar to learn - moves the first item from toReview to reviewedThisSess and deletes it from (due)toReview
      if (reviewedThisSess === null) setReviewedThisSess([itemToReview]);
      else {
        // since a card can already be in this array(when user typed missed it) there should be a check for a duplicate anbd two different 
        // approaches for handling duplicates
        let reviewed = JSON.parse(JSON.stringify(reviewedThisSess));
        
        const index = reviewed.findIndex((item: Item) => itemToReview.id === item.id)

        if(index !== -1){
        reviewed[index] = itemToReview
        }
        else
          reviewed.push(itemToReview);
        setReviewedThisSess(reviewed);
      }

      // Deletes the changed item from the (due)toReview array
      let newValues = toReview.slice(1);
      setToReview(newValues);

      // Handle streak:
      if (wasUpdatedToday === false) {
       const updateTheStreak = async() =>{
          try{
            await updateStreak()
          }
        catch (e) {
          console.error(e); 
        }
      }
      updateTheStreak();
      setWasUpdatedToday(true);
    }
    };

    const MissedIt = () => {
      // Creates variable to mutate
      const itemToReview = [...toReview]
      // Resets the box and review date to box 1
      itemToReview[0].reviewDate = Date.now() + day;
      itemToReview[0].box = 1;

      // Moves the missedit item to the end of the array
      const toReviewCopy = [...toReview.slice(1), toReview[0]];

      setToReview(toReviewCopy);

      // Moves the item to reviewedThisSess
      let reviewed = JSON.parse(JSON.stringify(reviewedThisSess));
      if (reviewed === null)
        setReviewedThisSess([itemToReview[0]])
      else{
        reviewed.push(itemToReview[0]);
        setReviewedThisSess(reviewed);
      }
    };

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Flashcard
            button1="Got it"
            button2="Missed it"
            name={currentItem.name}
            description={currentItem.description}
            image={currentItem.image}
            onPress1={GotIt}
            onPress2={MissedIt}
          />
        </ScrollView>
      </View>
    );
  } 
  else {
    return (
      <View style={{ flex: 1 }}>
        <Text> Loading.... </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
});
