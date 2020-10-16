import {updateSupport, GET_SUPPORT, SET_SUPPORT, MODIFY_SUPPORT, DELETE_SEM, ADD_SEM_NO_DUPLICATE} from '../actions/supportAction';
import {setSupport} from '../actions/supportAction';
import {State, FetchyResponse} from '../../types';
import { fetchy } from '../actions/apiAction';

export const getSupportMdl = ({dispatch} : any) => (next: any) => (action: any) => {
  next(action);

  if (action.type === GET_SUPPORT) {
    dispatch(fetchy('get', '/supports', null, setSupport));
  }
}

export const setSupportMdl = ({dispatch} : any) => (next: any) => (action: any) => {
  next(action);

  if (action.type === SET_SUPPORT) {
    const {empty, data}  = action.payload as FetchyResponse;
    if(empty) dispatch(fetchy('post', '/supports'));
    // since it is the fresh new baked data from database (Ultimate soruce) set it to front
    if(!empty) dispatch(updateSupport({
      ...data,
      ownerID: null,
      __v: null,
      _id: null
    }))
  }
}

export const modifyMdl = ({dispatch} : any) => (next: any) => (action: any) => {
  next(action);

  if (action.type === MODIFY_SUPPORT) {
    const payload: object = action.payload;
    dispatch(fetchy('put', '/supports', [payload]))
    dispatch(updateSupport(payload));
  }
}

export const addSemNoDupMdl = ({dispatch, getState} : any) => (next: any) => (action: any) => {
  next(action);

  if (action.type === ADD_SEM_NO_DUPLICATE) {
    const {support}: State = getState();
    const sem = action.payload;

    // #1 if already exists, no need to update at all
    const isFound = support.sems.find(elem => elem === sem) ? true : false;
    if(isFound === false) {
      const newSem = [...support.sems, sem] // existed + new(payload)
      dispatch(updateSupport({sems: newSem}));
      dispatch(fetchy('put', '/supports', [{sems: newSem}]))
    }
    
  }
};

export const deleteSemMdl = ({dispatch, getState} : any) => (next: any) => (action: any) => {
  next(action);

  if (action.type === DELETE_SEM) {
    const {support}: State = getState();
    const sem = action.payload;

    const newSem = support.sems.filter(elem => elem !== sem);
    dispatch(updateSupport({sems: newSem}));
    dispatch(fetchy('put', '/supports', [{sems: newSem}]))
  };
};

export const supportMdl = [getSupportMdl, setSupportMdl, modifyMdl, addSemNoDupMdl, deleteSemMdl]; 