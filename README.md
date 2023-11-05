# Introduction to Redux

In this section, we will learn about Redux in isolation without React. It's important to note that Redux is similar to the `useReducer` hook. If you are familiar with Reducer, you can understand Redux more easily.

## 1. Create Initial State

## 2. Define Reducer Function

- The reducer function receives `state` and `action`.
- The goal of this reducer is to calculate the new state based on the current state and the received action.
- It's essential to remember that reducers are not allowed to modify the existing state, and they should not perform any asynchronous logic or other side effects. Instead, place as much logic as possible inside of them.
- One key difference between Redux's reducer and `useReducer` hook's reducer is that in Redux, we directly pass the initial state as the default state:
  - `useReducer`'s reducer: `function reducer(state, action) {}`
  - Redux's reducer: `function reducer(state = initialState, action) {}`
- We use a switch statement in the reducer function to select the action type. Actions dispatched to the Redux store should have a type and a payload, similar to how we define actions in the `useReducer` function.

## 3. Cases in the Switch Statement

- It is advised to name actions according to what happens or what should happen.
- We structure action names in the shape of `state/domain/event-name`, for example, `account/deposit`.

## 4. Providing a Default Value

- In the `useReducer` hook's reducer function, we typically throw an error in the default case:
  ```javascript
  default:
    throw new Error();
  ```
- However, in the case of Redux's reducer function, for some reason, it is advised not to throw an error. Instead, simply return the original state. If the reducer receives an action it doesn't recognize, it will simply return the original state back. This approach ensures that the state will not be updated when an unknown action is dispatched, but it also prevents errors from occurring in such cases.
