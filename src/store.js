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
