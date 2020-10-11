import {SET_SUPPORT, ADD_SEM, updateSupport} from '../actions/support';
import {State} from '../../types';

export const setSupport = ({dispatch} : any) => (next: any) => (action: any) => {
  next(action);

  if (action.type === SET_SUPPORT) {
    dispatch(updateSupport(action.payload));
  }
}

export const addSem = ({dispatch, getState} : any) => (next: any) => (action: any) => {
  next(action);

  if (action.type === ADD_SEM) {
    const {supports}: State = getState();
    const sem = action.payload;

    // #1 if already exists, no need to update at all
    const isFound = supports.sem.find(elem => elem === sem) ? true : false;
    if(isFound === false) {
      const newSem = [...supports.sem, sem] // existed + new(payload)
      dispatch(updateSupport({sem: newSem}));
    }
    
  }
}


export const supportMdl = [setSupport, addSem]; 