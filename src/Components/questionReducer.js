// reducers/questionReducer.js
// questionReducer.js
const initialState = [];

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_QUESTION':
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default questionReducer;
