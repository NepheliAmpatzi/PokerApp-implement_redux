import { createStore, compose } from 'redux';
import { initialState } from './app.reducer';
import rootReducer from '../root.reducer';

const enhancers = [];
const { __REDUX_DEVTOOLS_EXTENSION__: devToolsExtension } = (global);

if (devToolsExtension && typeof devToolsExtension === 'function') {
  enhancers.push(devToolsExtension());
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    ...enhancers
  )
);

export default store;