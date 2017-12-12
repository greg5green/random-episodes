import {
  combineReducers
} from 'redux-immutable';

const appReducer = combineReducers({
  noop: (state = {}, action) => { console.log(action); return state; }
});

export default appReducer;
