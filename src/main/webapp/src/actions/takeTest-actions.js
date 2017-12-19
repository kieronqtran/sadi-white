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

function setCookie(cname,cvalue,extime){
  var d = new Date();
  d.setTime(d.getTime()+(extime*1000));
  var expire = "expires=" + d.toUTCString();
  document.cookie = cname +"=" + cvalue + ";" + expire + ";path=/";
}

function getCookie(cname){
  var name = cname + "=";
  var decodedCookie= decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i=0; i<ca.length; i++){
    var c = ca[i];
    while (c.charAt(0) == ' '){
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0){
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

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
  const token = docCookies.getItem('token')
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
          dispatch({ type: GET_TEST_SUCCESSFUL, test: res })
        } catch (error) {
          dispatch({ type: GET_TEST_ERROR, test: {} })
        }
      })
  }
}

export function submitTest(test){
  return function(dispatch) {
    const token = docCookies.getItem('token')
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
