import AsyncStorage from '@react-native-async-storage/async-storage';
import { Portrait, portraits, PORTRAITS_NUM } from '../portraits';
import { Item, storeLearned } from './async_functions';
import { useNavigation } from  'expo-router';

/*
// stores learned portraits - id + the date when it was learned
export const storeLearned = async (id: number) => {
  try {
    let data = await AsyncStorage.getItem('reviewed');
    if (data === null){
      let item = {
        id: id,
        reviewDate: Date.now(),
        box: 0
      }
      await AsyncStorage.setItem('reviewed', JSON.stringify([item]));
    }
    else{
      let values = JSON.parse(data);
      const exist = (item: Item) => item.id === id;
        if (! values.some(exist)){
        values.push({
          id: id,
          reviewDate: Date.now(),
          box: 0
        })
        await AsyncStorage.setItem('reviewed', JSON.stringify(values));
      }
    }
  } catch (e) {
    console.error(e); 
  }
};

export const loadData = async() => {
  const learned = await AsyncStorage.getItem('reviewed');
  if(learned !== null){
    return JSON.parse(learned);
  }
  return [];
}

// calculates a random index to show cards. excludes existing numbers
export const calculate = (data: Portrait[], values: Item[] ): number => {
      let i = Math.floor(Math.random() * data.length);
      if(values.length === PORTRAITS_NUM)
        return 0;
      for (const item of values) {
         if (item.id === i) return calculate(data, values);
      }
      if (i === 0)
        return calculate(data, values);
      else
        return i;
    }

// render portraits for review
export const reviewData = (values: Item[] ) => {
  let timeNow: number = Date.now();
  const toReview: Item[] = []

  values.forEach((item) => {
    if(item.reviewDate <= timeNow){
      toReview.push(item)
    }
  });

  return toReview
}

export const clickGet = async(index: number, toReview: Item[]) => {
  // time units declaration
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7

  if (toReview[index].box === 0){
    let data = await AsyncStorage.getItem('reviewed')
    if (data !== null){
      let items = JSON.parse(data);
      items[index].reviewDate = Date.now() + (30 * minute);
      await AsyncStorage.setItem('reviewed', JSON.stringify(items))
      return toReview.filter(item => item.id != index)
    }
  }

}
  */