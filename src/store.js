import { combineReducers, createStore } from 'redux';

/** USING Account reducer & Customer reducer COMBINED
 * i) we already have this account reducer stored in store
 * * const store = createStore(accountReducer);
 * ii) but how do we now store this Customer Reducer.
 * So do you remember that in Redux we don't dispatch actions
 * directly to the reducer but to the store and that's what we did using
 * * store.dispatch(deposit(500));
 * iii) now we cannot simply pass in another customerReducer to this store:
 * * const store = createStore(accountReducer);
 * instead we need to combine all the reducers we have in
 * order to create one so called root reducer, because this reducer
 * * createStore();
 * receives is always considered root reducer
 * iv) so we combine all the reducers, we will use
 * * combineReducers(); // function from redux (IMPORT AT TOP)
 * in this we will specify an object and then we need to give
 * each reducers a meaning full name
 * * const rootReducer = combineReducers({ account: accountReducer, customer: customerReducer })
 * v) now in end we use this rootReducer in store
 * * const store = createStore(rootReducer);
 * vi) now we can dispatch easily just by using function name
 * store.dispatch(createCustomer('Mahimkar Saad', '2105690238')); // console.log(store.getState());
 * store.dispatch(deposit(500));  // console.log(store.getState());
 * and we will get the output on our console do check the figure 1.1
 * vii) and point to be noted here, redux is very smart enough to know if the action type belongs to
 * to the customerReducer or accountReducer, as you can see in point vi) we dispatched
 * createCustomer and deposit from both reducers using same convention 'store.dispatch'
 */

//**************** ACCOUNT REDUCER ****************//

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

function accountReducer(state = initialStateAccount, action) {
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

//**************** CUSTOMER REDUCER ****************//

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.fullName,
        createdAt: action.payload.fullName,
      };
    case 'customer/updateName':
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

// !__________REDUCER COMBINER__________! \\

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

//*__________ ACCOUNT DISPATCHING __________*//

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

function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: 'customer/updateName', payload: fullName };
}

//*__________ CUSTOMER DISPATCHING __________*//
store.dispatch(createCustomer('Mahimkar Saad', '2105690238'));
console.log(store.getState());
