// types
import { WordyEvent, pathFinder } from './type/wordyEventType';
import { AvailableCookies } from './type/availableType';
import { EventType } from './type/wordyEventType';
import { Word } from './types';
// Library
import cookies from 'js-cookie';
import axios from 'axios'
// Redux
import store from './redux/store';
// Redux Action
import { setSnackbar } from './redux/actions';


// event Thrower
export const throwEvent = async (eventType: EventType, requesterInputData?: any, tempAccessToken?: string) => {
  // Prepare for a new event
  // even if bad user modfies requesterWrn, it will be still validated forward, andtherefore it is okay.
  const newEvent: WordyEvent = {
    eventVersion: "1.0.210731",
    eventType,
    requesterInputData,
    tempAccessToken,
  };

  // loads the requester data if it exists
  const returningEvent = await axios({
    method: "post",
    headers: { Authorization: `Bearer dump authorization code`},
    url: '/apigateway' + pathFinder(eventType),
    data: newEvent
  })
  .then((res) => {
    const returnedEvent: WordyEvent = res.data;
  
    if (returnedEvent.serverResponse === 'Denied') {
      store.dispatch(setSnackbar(typeof returnedEvent.serverMessage !== 'undefined' ? returnedEvent.serverMessage: "Denied for unknown reason by server", 'warning', 5));
    }
      
    console.log(returnedEvent); // testing
    return returnedEvent;
  })
  .catch((err) => {
    console.log(err);
    store.dispatch(setSnackbar('Server is rejecting or not responding your request', 'error', 5))
    newEvent.serverResponse = "Denied";
    
    return newEvent;
  });

  return returningEvent;
}; // end of throwEvent

// Cookies API
export const readCookie = (cookieName: AvailableCookies) => {
  const readCookie = cookies.get(cookieName);
  return readCookie ? readCookie : ""
};

export const addOrUpdateCookie = (cookieName: AvailableCookies, data: any, expires?: number) => {
  cookies.set(cookieName, data, { expires });
};

// Developed 
type Condition = {
  enableWordSearch?: boolean;
  enableMeaningSearch?: boolean;
  enableExamplesearch?: boolean;
};




export const wordSearchingAlgorithm = (searchData: string, words: Word[], condition: Condition): Word[] => {
  const regex = new RegExp(`.*${searchData}.*`);

  return words.filter(word => {
    let found = false;
    if (!found && condition.enableWordSearch && regex.exec(word.word) !== null) found = true;
    if (!found && condition.enableMeaningSearch && regex.exec(word.meaning) !== null) found = true;
    if (!found && condition.enableExamplesearch && regex.exec(word.example) !== null) found = true;

    return found;
  })
}
