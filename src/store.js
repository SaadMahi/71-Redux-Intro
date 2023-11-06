import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

import { configureStore } from '@reduxjs/toolkit';

/** REDUX-TOOL KIT (NEW-MODERN WAY OF WRITING REDUX)
 * The redux tool-kit is 100% compatible with the regular redux
 * we learned and applied till now, that means we can convert our
 * store and leave the slices pages we created as they are.
 *
 * 1) So let's install this new tool:
 * * npm i @reduxjs/toolkit
 *
 * 2) Now remember we previously discussed that the
 * * { createStore } from 'redux'
 * is depracate. Now we will use the configureStore() method instead so at the top import:
 * * import { configureStore } from '@reduxjs/toolkit';
 * i) so this configureStore function basically wraps around createStore and adds a few
 * functionalities to it, So configureStore does alot of things automatically for us
 * ii) it automatically combines reducers
 * iii) it automatically adds the thunk Middleware
 * iv) It also automatically set's up the developer tools for us this part:
 * * composeWithDevTools(applyMiddleware(thunk))
 * v) so all of these are created automatically and in the end our store is created and returned
 *
 * 3) so i have copied all the old methods in storeOldMethod-v1.js, you can refer that file
 * to check the classic redux store but now here in the modern method we don't need those all
 * so we are removing everything the
 * i) combiner
 * ii) middleware
 * iii) thunk
 * iv) createStore
 *
 * 4) So instead all we need is this at top:
 * * import { configureStore } from '@reduxjs/toolkit';
 * a) now to use this we simply call and inside we pass in object of options
 * * configureStore({})
 * i) so in here we can specify the root reducer property in which we tell the redux tool kit about
 * our two reducers account and customer
 * ii) store it in store variable so the result of it stays in the store
 * iii) now our application is working in the exact way same as before
 *
 * 5) So see now how easy it is to setup an redux application all we have to do is
 * i) call configureStore
 * ii) and pass in our two reducers
 *
 * 6) Now the part where we connect the React application with Redux works in the exact same way
 * as we did before, nothing chnages with the React-Redux package
 *
 * 7) So about the state slices, react-tool kit can help us writing those
 * So in the customer slice and account slice we can write the entire logic in a different way
 */

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
