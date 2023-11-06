import { useSelector } from 'react-redux';

/** READING DATA FROM REDUX STORE
 * In order to read data from Redux store all we have to do is use hook:
 * * useSelector()
 * which is provided by react-redux package which we instaleed previously
 *
 * 1) useSelector() hook
 * i) this useSelector hook takes in a callBack function and this function takes
 * as the single argument the entire redux store
 * * useSelector(store => )
 * ii) then from this store we can simply get the data we want eg:
 * * useSelector(store => store.customer);
 * this store.customer is exactly what we have writting in store.js file where we have
 * rootReducer inside and inside of it we have customer
 * iii) then after getting the data we can store that into any variable we want
 * * const customer = useSelector(store => store.customer);
 * iv) refer fig 1 for out, the out will be empty but that's fine we will work on that later
 * important thing to understand is that how it works
 */

function Customer() {
  const customer = useSelector((store) => store.customer);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
