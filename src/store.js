import { createStore } from 'redux';

/** CREATING ACTION CREATOR FUNCTIONS
 * ACTION CREATOR FUNCTIONS are nothing more than simply functions that return actions
 * they are not really redux thing, so redux would work perfectly fine wothout them but
 * they are usefull convention that redux developers have used forever.
 *
 * So Redux would work without action creator's but since it's a convention let's create some
 *
 * 1) We will be creating 1 action creator for each possible actions
 ** function deposit(amount) { return( { type: 'account/deposit', payload: amount } ) };
 ** function withdraw() {};
 ** function requestLoan() {};
 ** function payLoan() {};
 * These function only returns action's
 * We have passed in amount variable as it will be depended on the user input
 * i) Now let's see how do we use this with first example of deposit function
 * lke we logged to the console in previous lecture 02/feature, so how do we log values
 * using this method?
 *
 * so we still call the
 * * store.dispatch()
 * but then inside just writing an event we call the deposit function with our amount
 * * store.dispatch(desposit(500))
 * then we log state to the console
 * * console.log(store.getState())
 * ! REFER IMAGE... to verify
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

function deposit(amount) {
  return { type: 'account/deposit', payload: amount };
}
function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}
function requestLoan(amount, purpose) {
  return { type: 'account/requestLoan', payload: { amount, purpose } };
}
function payLoan() {
  return { type: 'account/payLoan' };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, 'buy a cheap car'));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());
