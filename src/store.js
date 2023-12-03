import { createStore } from 'redux';

/** INSTALLING REDUX IN PROJECT
 * So previously we did was writing an object and a function
 * So we didn't used Redux yet, now after setting up everything now we need it
 *
 * 1) To install redux, in terminal type:
 * * npm i redux
 *
 * 2) Now out of this redux package we will now take:
 * * create store method
 * i) so let's import it on top from redux
 * ii) as soon as we import it we can see that it has a line-through on it
 * the reason for that is the Redux Team declared that this method is depracated.
 * As i mentioned earlier there is now more modern way of writing Redux which is Redux tool-kit.
 * But it is way better to first learn Redux in this way and once we have all the Redux knowledge
 * then we can transition to the Redux tool kit, otherwise everything will really just seem like magic
 * as it just works too easily and you will have no idea what's just going on...
 *
 * 3) Calling createStore
 * i) So now let's call the createStore function with the reducer and store it inside store
 * * const store = createStore(reducer)
 * and that's it
 * ii) now we can dispatch actions on the store we created
 * eg, we can do:
 * * store.dispatch()
 * This is going to work in the exact same way as the dispatch function that we got as a result
 * of calling the useReducer hook, so this dispatch function is basically what we already know
 * from useReducer and so this is where now we can pass in an event
 * * store.dispatch({type: 'account/deposit', payload: 500});
 * iii) now how do we execute this and see the result
 * a) go to index.js file, and import entire store file there
 * b) import './store'
 * c) by doing this we will be able to run the store.js code
 * d) so for example if we console.log anything in this store.js
 * the output will be shown on log when we run this application
 * e) so what we are interested in to log to the console is:
 * * console.log(store.getState());
 * This will show us the current state of our store
 * as the result we get on the console:
 * ! {balance: 500, loan: 0, loanPurpose: ''};
 * iv) now we have our redux working in a simple way
 *
 * 4) Now let's store account/requestLoan but in here in payload we will be passing
 * an object which we haven't done something like this before before, but this is perfectly fine and nothing to worry
 * as by doing this we can pass in multiple pieces of data.
 * 
 store.dispatch({ type: 'account/requestLoan', payload: { amount: 1000, purpose: ' Buy a car' },
});
console.log(store.getState());
 *
 */

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };

    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };

    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

const store = createStore(reducer);

store.dispatch({ type: 'account/deposit', payload: 500 });
console.log(store.getState());

store.dispatch({
  type: 'account/requestLoan',
  payload: { amount: 1000, purpose: ' Buy a car' },
});
console.log(store.getState());

store.dispatch({ type: 'account/payLoan' });
console.log(store.getState());
