import Immutable from 'immutable';
import {
  applyMiddleware,
  createStore
} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

class Store {
  constructor() {
    this.store = createStore(
      reducers,
      new Immutable.Map(),
      applyMiddleware(thunk)
    );
  }

  getStore() {
    return this.store;
  }
}

export default new Store();
