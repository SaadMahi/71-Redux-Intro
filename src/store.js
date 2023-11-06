import { applyMiddleware, combineReducers, createStore } from 'redux';
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/** REDUX DEVELOPER TOOLS
 * Redux comes with some amazing developer tools
 * just like React, let's now install and use those developer tools
 * installing the redux dev tool is a 3 step process:
 * 1) so go install the Redux dev tool extensio into your browser
 * 2) install the corresponding npm package
 * * npm i redux-devtools-extension
 * i) now this npm package gives us one function that we need to use we need to import that at top
 * * import { composeWithDevTools } from 'redux-devtools-extension';
 * ii) now we need to wrap the Middleware with the composeWithDevTools
 * iii) give it a save and we are good to go, now it really doesn't matters why we need to write
 * it in this way or what's going behind the scenes, but that's it we need to do
 * iv) but by now we should get the new tab for redux in our developer tools:
 * ! refer figure 1
 *
 * v) when we click this we get our Redux dev tools:
 * ! refer figure 2
 *
 * 3) Now to test these we need to dispatch some actions
 * ! refer figure 3, 3.1 //
 * circled red is our first action dispatched with the name customer/createCustomer
 *
 * 4) we can also see the action object, with the type and the payload
 * ! figure 4
 * and also see the state that resulted after dispatching the action
 * ! figure 4.1
 * i) cool feature in it we also have is that we can jump back to previous state
 * ii) for example we have balance 0, then we deposited money now we have balance
 * 200, now we can click jump on previous state which will give us zero balance on UI
 * iii) you can also use slider(video player) to track each and every state change
 * iv) So this can be really use full when we have alot of different state transitions
 * and a really complex state, then we can time travel between these state transitions
 * in order to maybe find some bugs or some problems we might encounter
 *
 * v) you can also dispatch manually as per your will
 * ! figure 4.2, 4.3
 * so it updated the name right there, so this can be quite helpful if we just want to
 * manually dispatch some actions without having to wireup like some buttons in the Ui
 *
 */

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
