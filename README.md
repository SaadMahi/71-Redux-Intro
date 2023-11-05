# Installing Redux in a Project

In this guide, we'll go through the process of setting up Redux in your project. Previously, we worked on writing an object and a function. Now, we'll introduce Redux into our project.

## 1. Install Redux

To get started with Redux, open your terminal and run the following command:

```javascript
npm i redux
```

## 2. Importing the createStore Method

    Out of the Redux package we've just installed, we'll need to use the createStore method.

    To use it, import it at the top of your JavaScript file from the Redux library.

    Note that you might see a line-through on the createStore method. This is because the Redux team has declared it as deprecated. While there is a more modern way of using Redux called Redux Toolkit, it's recommended to learn the basics of Redux in this way first. Once you have a good understanding of Redux, you can transition to Redux Toolkit. Otherwise, Redux Toolkit might seem like magic, and you won't fully grasp what's happening.

## 3. Calling createStore

    Now that we have imported the createStore method, let's use it to create a store. Here's how:

    ```javascript
    const store = createStore(reducer);
    ```
    With this store in place, we can start dispatching actions. You can use the store.dispatch() method to dispatch actions. It works in the same way as the dispatch function you might be familiar with from the useReducer hook in React.

    For example, you can dispatch an action like this:

     ```javascript
    store.dispatch({ type: 'account/deposit', payload: 500 });
     ```
     To see the result of these actions, follow these steps:

a. Go to your index.js file and import the entire store file there:

    ```javascript
    import './store';

````
b. By importing the store.js file in your index.js, you enable the execution of the code in that file.

c. Any console.log statements in store.js will be displayed in the console.

d. You can use the following code to log the current state of your Redux store:

 ```javascript
     console.log(store.getState());
 ```
 The console will display the current state, which might look something like this:

 ```javascript
     { balance: 500, loan: 0, loanPurpose: '' };
 ```
Congratulations, you now have Redux working in your project in a straightforward way!

## 4. Storing account/requestLoan with Payload

In Redux, you can store the account/requestLoan action with a payload. This payload can be an object, allowing you to pass multiple pieces of data. Here's an example:

 ```javascript
     store.dispatch({ type: 'account/requestLoan', payload: { amount: 1000, purpose: 'Buy a car' } });
 ```

 To see the result of this action, you can log the current state of your Redux store:

   ```javascript
 console.log(store.getState());
    ```















````
