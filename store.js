import { createStore, combineReducers } from 'redux';
import Reducer from './src/reducer';

const rootReducer = combineReducers({
    UserInfo: Reducer
  });

  const configureStore = () => {
    return createStore(rootReducer);
  }

  export default configureStore;