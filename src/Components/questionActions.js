// questionActions.js

// Action Types
export const ADD_QUESTION = 'ADD_QUESTION';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';

// Action Creators
export const addQuestion = (question) => ({
    type: ADD_QUESTION,
    payload: question,
});

export const updateAnswer = (questionId, answer) => ({
    type: UPDATE_ANSWER,
    payload: {
        questionId,
        answer,
    },
});
