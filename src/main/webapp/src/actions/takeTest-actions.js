import docCookies from '../helper/cookie';
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
export const STOP_COUNTDOWN = "STOP_COUNTDOWN";

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
  return async dispatch => {
    try {
      const token = docCookies.getItem('token')
      dispatch({ type: GET_TEST_FETCH })
      const response = await fetch('/api/testings/'+testId, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      dispatch({ type: GET_TEST_SUCCESSFUL, test: data})
    } catch (error) {
      dispatch({ type: GET_TEST_ERROR, test: {} })
    }
  }
}

export function submitTest(test){
  return async (dispatch) => {
    const token = docCookies.getItem('token')
    const response = await fetch('/api/testing/result',{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(test),
    })

    if(response.status === 201) {
      dispatch({
        type: SUBMIT_RESULT_SUCCESSFUL,
      });
    }

    dispatch(push('/user'))

    if(response.status === 500) {
      dispatch({
        type: SUBMIT_RESULT_FAIL,
      })
    }
  };
}
