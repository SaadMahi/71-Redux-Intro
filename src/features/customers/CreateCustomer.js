import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCustomer } from './customerSlice';

/** DISPATCHING ACTIONS TO REDUX STORE FROM REACT COMPONENTS
 * So here our setup is ready and in handleClick we would want to
 * dispatch an action that will create a new customer
 * ? so how will we do that
 *
 * i) before when we wanted to dispatch an action we called the dispatch
 * method on the redux store, but that's not how we do it inside React
 * instead we get access to the dispatch function by using a hook:
 * * useDispatch()
 * it is a custom hook provided to us by react-redux package once again
 * a) this will return us a dispatch function therefore we store it into a variable:
 * * const dispatch = useDispatch()
 * so this dispatch function will now work exactly in the same way as before
 *
 * ii) now we can use that in our handleClick event handler
 * * function handleClick() { dispatch() }
 *
 * ? iii) but what action should that be and how should we do that
 * this is where our ACTION CREATORS comes into play again. So in customerSlice.js file
 * you can see we have ACTION CREATORS functions at bottom,
 * ! (refer fig 1.1)
 *
 * iv) So all we have to do is import these function into our component on top,
 * * import { createCustomer } from './customerSlice';
 * now you remember why we used named export foreach of these function? great.
 * now according to function pass in the data of user input
 * ! (refer 2.1 & 2.2 images)
 */

function Customer() {
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');

  // dispatch function
  const dispatch = useDispatch();

  function handleClick() {
    if (!fullName || !nationalId) return;
    dispatch(createCustomer(fullName, nationalId));
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className='inputs'>
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;
