/* eslint-disable import/no-anonymous-default-export */
const initialState = {
  bills: [],
  loading: false,
  error: null,
};
function billsReducer(state = initialState, action) {
  const { type, payload } = action;
  if (type === "BILL_SUCCESS") {
    return {
      ...state,
      bills: payload,
    };
  } else {
    return initialState;
  }
}

export default billsReducer;
