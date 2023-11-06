import { createSlice } from '@reduxjs/toolkit';

/** LET's GET OUR THUNKS BACK (functionality of converting currency)
 * Now in order to create thunks in redux tool kit
 * we can use the create asynch thunk function
 * that redux tool kit provides us, how ever using this function is in my opinion
 * is a lot of extra work, when there is an easier solution which is to simply use
 * the Action Creator function that we already used before, you can also go below and
 * see the commented code, So we can basically reuse that function right here, So let's
 * do that, now if you are really interested in the create async thunk function
 * which basically means doing things in redux tool kit way, we will do that in future project.
 * But for now let's do it in a easy way
 *
 * 1) So simply copy the code from commneted area and this will work
 * directly as thunks are automatically provided in redux tool kit,
 * so we don't have to install anything and this will simply already work
 * without any setup, you just need to do is remove the { deposit } action creator from it and it will work
 *
 * 2) Now for deposit, we are going to use our own one,
 * make sure in this function we have account name same which we used in accountSlice.name
 * and we have the same action type in
 * * action/nameOfTheReducer
 * format, it's important it follows the ame convention, and with that redux is smart enough to figure
 * out that this is the action creator for that reducer, now create a reducer for this convertingCurrency
 * * dispatch({ type: 'account/convertingCurrency' });
 * so we can set isLoading state
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
      state.isLoading = false;
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
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

// console.log(accountSlice);
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

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
