import { Portrait } from '../portraits';
import { Item, storeLearned, updateLearned } from './async_functions';
import { AppState, AppStateStatus} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

function isPortrait(obj: unknown): obj is Portrait {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as any).id === 'number' &&
    typeof (obj as any).name === 'string' &&
    typeof (obj as any).image === 'number' &&
    typeof (obj as any).description === 'string'
  );
}
// When user leaves the app
export const leaveApp = (appState: React.MutableRefObject<AppStateStatus>, doneThisSess: Portrait[] | Item[] | null) => {
  const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background'){
      if(doneThisSess !== null){
        const store = async() => {
      for(const item of doneThisSess){
        if(isPortrait(item))
            await storeLearned(item.id)
        else
            await updateLearned(item.id, doneThisSess as Item[])
      }}
      store()
      }}

      appState.current = nextAppState;

    }
  
  );

    return () => {
      subscription.remove();
    };
}

export const leavePage = (navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, "getState"> , doneThisSess: Portrait[] | Item[] | null) => {
    const unsubscribed = navigation.addListener('beforeRemove', async (e) => {
      // if learnedThisSess is empty it doesn't save anything
      if(doneThisSess === null || doneThisSess.length === 0){
      return
    }

    e.preventDefault();

    const store = async() => {
      for(const item of doneThisSess){
        if(isPortrait(item)){
          try{
            await storeLearned(item.id)
          } catch(e){console.log(e)}
        }
        else{
          try{
            await updateLearned(item.id, doneThisSess as Item[])
          } catch(e){console.log(e)}
        }
    }}
    // Stores everything to async storage
    await store();

    // Cleans up the listener so that the function doesn't run forever
    unsubscribed();
  
  // Lets the user leave the page
    navigation.dispatch(e.data.action)
  })
  return unsubscribed
}

// Returns the formatted date string(date - today)
export const getDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};