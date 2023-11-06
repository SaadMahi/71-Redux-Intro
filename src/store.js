import { combineReducers, createStore } from 'redux';
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

// !__________REDUCER COMBINER__________! \\
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// !__________CREATED STORE__________! \\
const store = createStore(rootReducer);

export default store;
