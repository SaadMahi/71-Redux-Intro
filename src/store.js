import { combineReducers, createStore } from 'redux';
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

/** CONNECTING STORE WITH THE REACT APPLICATION
 * 1) Connect store to React
 * i) now to connect this store with our React application we need to import a package
 * * npm i react-redux
 * ii) only with this package react and redux application's can talk to each other
 *
 * 2) After installation of package
 * i) once package is intalled provide store to your application (it works in a similar way to Context API)
 * ii) in index.js file import package:
 * * import { Provider } from 'react-redux'
 * iii) wrap the entire application into this provider just like we do with the context api
 * iv) in this provider we pass in store prop and it's value will be set to store as we need to pass in the store
 * v) by doing all the above we have successfully connected react and redux
 * vi) now every single component in the application can now read data from the store and can dispatch actions to it
 */

// !__________REDUCER COMBINER__________! \\
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// !__________CREATED STORE__________! \\
const store = createStore(rootReducer);

export default store;
