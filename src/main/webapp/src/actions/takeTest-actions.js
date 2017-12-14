import { push } from 'react-router-redux';
export const GET_TEST_FETCH = "FETCHING_TEST"
export const GET_TEST_SUCCESSFUL = "RECEIVED_TEST";
export const GET_TEST_ERROR = "FAILED_TO_RECEIVE_TEST";
export const NEXT_QUESTION = "GET_NEXT_QUESTION";
export const PREVIOUS_QUESTION = "GET_PREVIOUS_QUESTION";
export const SUBMIT_RESULT_SUCCESSFUL = "SUBMIT_RESULT_SUCCESS";
export const SUBMIT_RESULT_FAIL = "SUBMIT_RESULT_FAIL";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const START_COUNTDOWN = "START_COUNTDOWN";

export function nextQuestion(){
  return {
    type: NEXT_QUESTION,
  }
}
export function previousQuestion(){
  return {
    type: PREVIOUS_QUESTION
  }
}
export function answerQuestion(questionId, answerId){
  return {
    type: ANSWER_QUESTION,
    ans: {question: questionId, answer: answerId},
  }
}

export function takeTest(testId){
  const token = sessionStorage.getItem('token')
  return async dispatch => {
    dispatch({ type: GET_TEST_FETCH })
    fetch('/api/testings/'+testId, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        try {
          dispatch({
            type: GET_TEST_SUCCESSFUL,
            test: res
          })
        } catch (error) {
          dispatch({
            type: GET_TEST_ERROR,
            test: {}
          })
        }
      })
  }
}
export function submitTest(test){
  return function(dispatch) {
    const token = sessionStorage.getItem('token')
    return fetch('/api/testing/result',{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(test),
    })
      .then(res => {
        if(res.status === 201) {
          dispatch({
            type: SUBMIT_RESULT_SUCCESSFUL,
          });
        }
        dispatch(push('/user'))
        if(res.status === 500) {
          dispatch({
            type: SUBMIT_RESULT_FAIL,
          })
        }
      });
  };
}
