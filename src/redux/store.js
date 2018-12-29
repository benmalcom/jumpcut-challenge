import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const createStoreParams = [rootReducer];
createStoreParams.push(composeWithDevTools(
	applyMiddleware(createLogger())
));
// Create store
const store = createStore(...createStoreParams);
export default store;
