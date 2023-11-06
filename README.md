# Bringing Back Our Thunks - Handling Currency Conversion

In this section, we revisit the concept of thunks, which enable asynchronous actions in Redux. To achieve this functionality, we have two options: using the `createAsyncThunk` function provided by Redux Toolkit or leveraging a simpler approach with custom action creators, which we explore here.

## 1. Using Custom Action Creators

We begin by explaining that we can restore the thunk functionality using custom action creators. While Redux Toolkit offers `createAsyncThunk`, we opt for the straightforward approach of reusing existing action creators. We also clarify that using `createAsyncThunk` will be covered in a future project.

## 2. Copying Code

We suggest copying the code from the commented area, as it works effectively for creating thunks. Thunks are automatically provided in Redux Toolkit, requiring no additional setup. The only modification needed is to remove the `{ deposit }` action creator.

## 3. Maintaining Naming Conventions

To ensure the code works seamlessly, we emphasize the importance of maintaining consistent naming conventions. The `name` property in the `accountSlice` and the action type format should match. This convention allows Redux to associate the action creator with the reducer correctly.

## 4. Creating the `convertingCurrency` Reducer

We introduce a new reducer, `convertingCurrency`, responsible for setting the `isLoading` state to `true`. This is essential to indicate that a currency conversion is in progress.

In summary, we demonstrate how to re-implement thunks in Redux without the need for additional tooling. We stress the importance of naming conventions and explain how the `convertingCurrency` reducer fits into the state management.
