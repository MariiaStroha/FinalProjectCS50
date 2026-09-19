import AsyncStorage from '@react-native-async-storage/async-storage';
import { Portrait } from '../portraits';

// declares the item(one portrait) type
export interface Item{
  id: number,
  reviewDate: number,
  box: number
}

const second = 1000;
  const minute = second * 60;

// stores learned portraits - id + the date when it was learned
export const storeLearned = async (id: number) => {
  try {
    // rawData - the string getItem returns in case it's not null
    const rawData = await AsyncStorage.getItem('learned');
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