import { combineReducers, createStore } from 'redux';
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

/** PROFESSIONAL REDUX FILE STRUCTURING USING (STATE SLICES)
 * so when we have multiple initial states, reducers & action creators our got starts to get out of our hands
 * so as we have two different domains Account and the Customer both are here being used in 1 single file
 * so imagine we had 10 Reducer's like these instead of two, which is not practical at all
 *
 * so we will be working with two features, accountReducer and cutomerReducer
 *
 * 1) CREATING SLICE FILES FOR STRUCTURING REDUX FILE
 * i) create folder in src: features
 * ii) in features create folder's for each features: accounts & customers
 * iii) move your ready made files to their respective folder's and update their imports
 * iv) once done with above create redux files in each folder: accountSlice.js & customerSlice.js.
 * So slice is basically a piece or just a part of total state so the entire state lives in the store
 * So in slice file we basically take one slice of that state
 * v) now the idea is to in each slice file we co-locate as much as the redux logic as possible in one file
 * vi) So we will be placing the reducer, initial state, action creators
 * vii) once placed all the code to their respective slices files, let's move to step 2
 *
 * 2) IMPORTING REDUCERS FROM SLICE FILES TO THIS STORE
 * i) Use export default the Reducers (we will be importing these in our store)
 * ii) Use named export for Action Creators (won't be importing in our store)
 * later on we will dispatch these Action's inside our React component's,
 * that's where these action creators will be used
 * iii) let's export the created store as defaullt so we
 * can get this store into our application
 * iv) go to index and change:
 * * import './store';
 * to this:
 * * import store from './store';
 * as we no longer want to just run this file like to log to the console store contents we did previously
 * v) finally to check the working of dispatch you can just dispatch in index.js and log to the console (refer figure 1.1 for output)
 *
 * 3) CONCLUSION
 * i) we divided our reduers into multiple slices
 * ii) a slice basically contains the INITIAL STATE, REDUCER and ACTION CREATORS.
 * iii) also notice these slice files have only functions and a object, we are not using redux in here
 * iv) the only file in which we are using redux is this store.js file
 * vi) so in this store.js file we:
 * a) combine our reducers
 * b) create a store
 * c) in the end we export that store and used in index.js
 * d) in next lecture we will be injecting this store into our React application
 */

// !__________REDUCER COMBINER__________! \\
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// !__________CREATED STORE__________! \\
const store = createStore(rootReducer);

export default store;
