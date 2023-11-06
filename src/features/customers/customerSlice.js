//*__________ INITIAL-STATE __________*//

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

//*__________ ACCOUNT REDUCER __________*//

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.fullName,
        createdAt: action.payload.fullName,
      };
    case 'customer/updateName':
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

//*__________ ACTION CREATORS __________*//

function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: 'customer/updateName', payload: fullName };
}
