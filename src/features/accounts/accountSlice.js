//*__________ INITIAL-STATE __________*//

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

//*__________ ACCOUNT REDUCER __________*//

export default function accountReducer(state = initialStateAccount, action) {
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

//*__________ ACTION CREATORS __________*//

/**  PLAYING WITH CURRENCY
 * so in this deposit besides accepting amount we also need to accept an currency
 * so as we dispatch amount we will now also pass in the currency, so let's add currency parameter besides amount
 *
 * So here we will be setting a condition, if currency set by the user is in USD
 * then return the values as it is but if not we will now require to call the API
 * for converting the currency into USD
 *
 * and to do that APi call we will need thunk
 * so now in else condition
 * we will return a function and when we return a function
 * redux knows that this function is an asynchronous action
 * that we want to execute before dispatching anything to the store
 *
 * So in order to later dispatch this function that redux will call internally
 * will get access to the dispatch function and to the current state known as getState:
 * and inside this function we will do our Api call.
 * * return function(dispatch, getState){ // APi call}
 * Once we are done doing everything in end we will return the action
 *
 * NOTE in the end we do not need to return but instead we dispatch() the converted value
 *
 * 2) So to sum up,
 * i) first we dispatch in accounts operation:
 * *  dispatch(deposit(depositAmount, currency));
 * and in the case do not have currency in the USD dollars then this
 * * deposit(depositAmount, currency) inside the dispatch
 * will return a function, and that function is right below you can see the async function
 *
 * ii) and then redux will call this async function and because of that we can use
 * the dispatch function in the parameter so we can later on call this function when
 * we want to dispatch a action in the end to the store.
 * And this all already works nicely
 * ! figure 2.1 for output
 *
 * iii) So into observation this entire async function
 * this isour middleWare and you can see that it really sits between the dispatching and the store
 * a) so when we dispatch the action and the currency is different then the USD then that action
 * actually never reaches the store because instead this async code will here be executed
 * and only after this is finished we then dispatch new action to our store with the new value
 * and in conclusion this async really fits in the middle, therefore the name is Middleware
 */

export function deposit(amount, currency) {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };

  return async function (dispatch, getState) {
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
