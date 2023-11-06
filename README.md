USING Account reducer & Customer reducer COMBINED

i) we already have this account reducer stored in store
const store = createStore(accountReducer);

ii) but how do we now store this Customer Reducer.
So do you remember that in Redux we don't dispatch actions
directly to the reducer but to the store and that's what we did using
store.dispatch(deposit(500));

iii) now we cannot simply pass in another customerReducer to this store:
const store = createStore(accountReducer);
instead we need to combine all the reducers we have in
order to create one so called root reducer, because this reducer
createStore();
receives is always considered root reducer
iv) so we combine all the reducers, we will use
combineReducers(); // function from redux (IMPORT AT TOP)
in this we will specify an object and then we need to give
each reducers a meaning full name
const rootReducer = combineReducers({ account: accountReducer, customer: customerReducer })

v) now in end we use this rootReducer in store
const store = createStore(rootReducer);
vi) now we can dispatch easily just by using function name
store.dispatch(createCustomer('Mahimkar Saad', '2105690238')); // console.log(store.getState());
store.dispatch(deposit(500)); // console.log(store.getState());
and we will get the output on our console do check the figure 1.1
![1 1](https://github.com/SaadMahi/71-Redux-Intro/assets/117567622/2f548155-e975-4676-b51b-253945ee9042)

vii) and point to be noted here, redux is very smart enough to know if the action type belongs to
to the customerReducer or accountReducer, as you can see in point vi) we dispatched
createCustomer and deposit from both reducers using same convention 'store.dispatch'
