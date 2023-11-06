import { combineReducers, createStore } from 'redux';

/** PROFESSIONAL REDUX FILE STRUCTURING USING (STATE SLICES)
 * so when we have multiple initial states, reducers & action creators our got starts to get out of our hands
 * so as we have two different domains Account and the Customer both are here being used in 1 single file
 * so imagine we had 10 Reducer's like these instead of two, which is not practical at all
 *
 * so we will be working with two features, accountReducer and cutomerReducer
 *
 * i) create folder in src: features
 * ii) in features create folder's for each features: accounts & customers
 * iii) move your ready made files to their respective folder's and update their imports
 * iv) once done with above create redux files in each folder: accountSlice.js & customerSlice.js.
 * So slice is basically a piece or just a part of total state so the entire state lives in the store
 * So in slice file we basically take one slice of that state
 * v) now the idea is to in each slice file we co-locate as much as the redux logic as possible in one file
 * vi) So we will be placing the reducer, initial state, action creators
 */

// !__________REDUCER COMBINER__________! \\

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);
