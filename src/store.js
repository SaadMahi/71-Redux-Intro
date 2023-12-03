/** INTRODUCTION TO REDUX
 * here we will be learning redux in isolation without React
 * NOTE: Redux is similiar to useReducer hook, So if you are familiar with Reducer you can understand Redux
 *
 * 1) Create initialState
 *
 * 2) Define reducer function
 * i) it receives state & action
 * ii) goal of this reducer is to calculate the new state based on the current state and on the received action
 * iii) it's also important to remember that reducer's are not allowed to modify the existing state an they are
 * also not allowed to do any asynchronous logic or other side effects, instead what we should do with reducers is
 * to place as much logic as possible inside of them.
 * iv) one thing is different in this redux's reducer and useReducer hook's reducer is that we directly pass
 * the initial state as the default state
 * ? useReducer's reducer :
 * * function reducer(state, action) {}
 * ? Redux's reducer:
 * * function reducer(state = initialState, action) {}
 * v) using the switch statement in the reducer function to select action type.
 * so the actions that are going to be dispatched to this Redux store
 * they will again have to shape of type and a payload like we do in useRecuder's function
 * that's why it is now easy to learn redux
 *
 * 3) Now let's come to the cases we provide in this switch case
 * i) it is advised to write these actions names, these actions names should model what happens
 * or what should happen
 * ii) so we write them in a shape of state domain eg: account/deposit so it's domain/event-name
 *
 * 4) We give a default value
 * i) but in useReducer's reducer function we used to throw an error in default val:
 *   default:
 *   throw new Error
 * ii) but in case of redux's reducer function for some reason it is adviced to not do that and instead
 * simply return the original state, so in case that the reducer receives an action that doesn't know
 * about it will simply return the original state back. So the state will simply not be updated, but there
 * also won't be an error
 */

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'action/deposit':
      return { ...state, balance: state.balance + action.payload };

    case 'action/withdraw':
      return { ...state, balance: state.balance - action.payload };

    case 'action/requestLoan':
      if (state.loan > 0) return state;
      return { ...state, loan: action.payload };

    case 'action/payLoan':
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
