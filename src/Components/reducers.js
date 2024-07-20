// reducers.js
import { ADD_DATA } from './Action';

const initialState = {
  storedData: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
      // Check if the new question already exists in the storedData array
      const existingQuestionIndex = state.storedData.findIndex(item => (
        item.que === action.payload.que
      ));
      // If it's not a duplicate, add the new data to the storedData array
      if (existingQuestionIndex === -1) {
        return {
          ...state,
          storedData: [...state.storedData, action.payload],
        };
      } else {
        // If it's a duplicate, update the options for the existing question
        const updatedStoredData = [...state.storedData];
        updatedStoredData[existingQuestionIndex] = action.payload;
        return {
          ...state,
          storedData: updatedStoredData,
        };
      }
    default:
      return state;
  }
};

export default dataReducer;
