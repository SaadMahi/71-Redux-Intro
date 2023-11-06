import { applyMiddleware, combineReducers, createStore } from 'redux';
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';
import thunk from 'redux-thunk';

/** MIDDLEWARE AND THUNKS
 * Let's use redux thunks to implement a feature where the User
 * can deposit the money into the account in a foreign currency
 * which will then be converted calling an external Api
 *
 * ! refer figure 1.1 for the below explanation
 * So the idea is when ever user deposits some money in deposit input
 * they can select which currency that money is for example user selectes EURO
 * and if the selected currency by the User is different than the USD then we
 * to convert the user's input money back to USD before it get's deposited
 * into the account means before that deposit action is dispatched to the store
 *
 * That's where the redux Thunk comes into the play
 * So we will have this MiddleWare sitting in between dispatching the action
 * as we click on the deposit button and the action reaching the store
 *
 * In order to use this MiddleWare we need to follow these 3 steps:
 * 1) install the MiddleWare package
 * * npm i redux-thunk
 * a) import thunk function from redux thunk at top
 * * import thunk from 'redux-thunk';
 *
 * 2) Apply the middleware to our redux store we created
 * a) pass in another argument in create store function, here we need to call apply middleware function,
 * this is provided by redux and into this applyMiddleware function we pass in our middleware
 * and that middleware is thunk that we imported from redux-thunk
 * * const store = createStore(rootReducer, applyMiddleware(thunk));
 * So by doing all above we told redux or we told our store, that we want to use thunk middleware
 * in ou application and so let's now go to action creator in account slice
 * which is responsible for depositing money into the account
 *
 *
 * 3) We use the middleware in our action creator functions
 */

// !__________REDUCER COMBINER__________! \\
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// !__________CREATED STORE__________! \\
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
