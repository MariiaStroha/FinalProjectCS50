import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDate } from './helpers'

// declares the item(one portrait) type
export interface Item{
  id: number,
  reviewDate: number,
  box: number
}

// Declares the streak object type
export interface Streak{
  currentStreak: number,
  bestStreak: number,
  lastReview: string | null
}

// stores learned portraits - id + the date when it was learned
export const storeLearned = async (id: number) => {
  try {
    // rawData - the string getItem returns in case it's not null
    const rawData =  await AsyncStorage.getItem('learned');
    
    if (rawData === null){
      let item = {
        id: id,
        reviewDate: Date.now(),
        box: 0
      }
      await AsyncStorage.setItem('learned', JSON.stringify([item]));
    }
    else{
    
    let learnedPortraits = JSON.parse(rawData);
    const exist = (item: Item) => item.id === id;
    if (! learnedPortraits.some(exist)){
        learnedPortraits.push({
        id: id,
        reviewDate: Date.now(),
        box: 0
        })
        await AsyncStorage.setItem('learned', JSON.stringify(learnedPortraits));
    }
    }
  } catch (e) {
    console.error(e); 
  }
};

export const updateLearned = async(id: number, reviewedPortraits: Item[]) => {
  const rawData = await AsyncStorage.getItem('learned');
  if(rawData !== null){
    let learnedPortraits = JSON.parse(rawData);
    const updatedLearnedPortraits = learnedPortraits.map((item: Item) => {
      if(item.id === id){
        const updatedKeys = reviewedPortraits.find((portrait: Item) => portrait.id === id);
        if(updatedKeys !== undefined){
            item.reviewDate = updatedKeys.reviewDate;
            item.box = updatedKeys.box;
        }
      }
      return item;
  }
)
  await AsyncStorage.setItem('learned', JSON.stringify(updatedLearnedPortraits));
}
}

export const loadData = async() => {
  const learned = await AsyncStorage.getItem('learned');
  if(learned !== null){
    return JSON.parse(learned);
  }
  return [];
}


// Streak

export const updateStreak = async() => {
  try {
    const rawData = await AsyncStorage.getItem('streak');
    if(rawData !== null){
      const previousStreak: Streak = JSON.parse(rawData)

      // Gets the updated current streak
      const newCurrentStreak = previousStreak.currentStreak + 1;
      
      // Gets the updated beststreak
      let newBestStreak = null

      if(newCurrentStreak > previousStreak.bestStreak){
        newBestStreak = newCurrentStreak;
      }

      // Creates a new object with updated values
      const newStreak = {
        currentStreak: newCurrentStreak,
        bestStreak: newBestStreak ?? previousStreak.bestStreak,
        lastReview: getDate()
      }

      // Saves new streak to async storage
      await AsyncStorage.setItem('streak', JSON.stringify(newStreak));
    }
  } catch (e) {
    console.error(e); 
  }
}

export const resetStreak = async() => {
  try{
    const rawData = await AsyncStorage.getItem('streak');
    if(rawData !== null){
      const previousStreak = JSON.parse(rawData);
      // Resets currentstreak to 0 and leaves beststreak and lastreview as-is
      const resetStreak = {
        currentStreak: 0,
        bestStreak: previousStreak.bestStreak,
        lastReview: previousStreak.lastReview
      }

      // Saves updated values to async storage
      await AsyncStorage.setItem('streak', JSON.stringify(resetStreak));
    }
  }
  catch (e) {
    console.error(e); 
  }
}

export const loadStreak = async() =>{
  const streak = await AsyncStorage.getItem('streak');
  if(streak !== null){
    return JSON.parse(streak);
  }
  return null;
}