import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// !__________REDUCER COMBINER__________! \\
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// !__________CREATED STORE__________! \\
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
