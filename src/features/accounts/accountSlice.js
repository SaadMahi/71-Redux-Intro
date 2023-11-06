import { createSlice } from '@reduxjs/toolkit';

/** CONVERTING ACCOUNT STATE SLICE INTO REDUX TOOL KIT
 * So remember how we have here orgnised our code into this concept of slices
 * i) we have initialState
 * ii) reducer
 * iii) action creators at the bottom of this file
 *
 * 1) So now with this Redux tool kit this idea of slices actually got baked
 * into redux itself so we now have this function called:
 * * createSlice()
 * which we can import fom redux-toolkit
 * * import { createSlice } from "@reduxjs/toolkit";
 *
 * 2) Now this createSlice method gives us 3 benefits:
 * i) it will automatically create action creators from our reducers
 * ii) it makes writing these reducers alot easier, as we no longer need that
 * switch statement and that default case at the end of switch, these are now
 * automatically handled
 * iii) we can mutate our state inside reducers
 * so behind the scenes it will use a library called immer, which will convert
 * our logic back to immutable logic, so behind the scenes redux still requires this kind of logic:
 **    return {
 **     ...state,
 **     balance: state.balance + action.payload,
 **     isLoading: false,
 **    };
 * where we do not mutate the state, but now we will be able to convert this kind of logic into
 * a mutating logic and this last point is the biggest advantage for using the redux toolkit over
 * what we have been doing before
 *
 * 3) So let's start converting:
 * i) we will keep the initial state as it is
 * ii) comment the accountReducer function
 * iii) also comment the action creators
 * iv) now call the
 * * createSlice() function
 * which then accepts  an object of options, then this in the end will return as slice
 * so we will store this returned slcie into a vairable accountSlice
 * * const accountSlice = createSlice({});
 * ? v) now what do we need to pass in here
 * i) name of the slice: account
 * * name: slice
 * ii) next we pass in initialState, so that's the property called initialState
 * in which we pass in our initialState made by us
 * * initialState: initialSate
 * iii) finally we need to pass in the reducers and in this we will have multiple reducers.
 * iv) let look at the first example, here we will be adding an mutating logic
 ** deposit(state, action) {
 **    state.balance = state.balance + action.payload;
 ** },
 * so here the logic of receiving the current state and the action that was dispatched
 * is still exactly the same way as in classic redux, the only difference is that we no longer
 * return the entire state now and also we don't create a new object and then set the balance property
 * Instead we mutate the balance property that lives on the state
 *
 * 4) So when creating this account slice is complete you will come to know that here are
 * functions as our reducers and as our action creators
 * i) just accountSlice to the console and check what we get and export required functions accordingly
 * ! refer figure 1
 * and as we save changes, we will be back to working
 * ! refer figure 2
 *
 * 5) Now there is a problem here that these actions creators when we use them anywhere
 * these functions cannot take in two arguments, as you can see:
 * ! refer figure 3
 * that's why amount and purpose here do not receive
 * ! refer figure 3.1
 *
 * So this is the limitation of having this opinionated structure, so as these
 * action creators are automatically created, then we cannot create or reconfigure them,
 * So we cannot easily make them receive two arguments
 *
 * 6) Luckily for us there is a solution to this that redux-toolkit implemented for us
 * i) what we have to do is prepare the data before it reaches the reducer and what we have to do now
 * ii) so we need an new object here
 * ! refer figure 4
 * iii) then we need to call this fucntion just a reducer
 * ! refer figure 4.1
 * iv) and we need to prepare data above this with a prepare method
 * in this method we can accept data that we want, so these can have parameters that earlier
 * we had in our action creator which are amount and the purpose
 * ! refer figure 4.2
 * v) now inside this we need to return an object which will become the payload object
 * in the reducer we have below, that's why it's called prepare
 * vi) so here we return a new payload and this payload should become an object with amount and purpose
 * ! refer figure 4.3
 * v) and this is what we need to do when we want our action creator to receive more than one arguents
 *
 * 7) In conclusion you can keep your slices like before without using the redux tool kit if you want
 * or else you can use this modern method, it's totally upto you and you preference
 */

//*__________ INITIAL-STATE __________*//

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return state;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },
  },
});

// console.log(accountSlice);

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;

/*
__________ ACCOUNT REDUCER __________

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

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
    case 'account/convertingCurrency':
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
}

__________ ACTION CREATORS __________

export function deposit(amount, currency) {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: 'account/convertingCurrency' });

    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    dispatch({ type: 'account/deposit', payload: converted });
  };
}
export function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}
export function requestLoan(amount, purpose) {
  return { type: 'account/requestLoan', payload: { amount, purpose } };
}
export function payLoan() {
  return { type: 'account/payLoan' };
}

*/
