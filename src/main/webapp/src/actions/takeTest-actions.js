export const GET_TEST = "RECEIVED_TEST";
export const GET_TEST_ERROR = "FAILED_TO_RECEIVE_TEST";
export const NEXT_QUESTION = "GET_NEXT_QUESTION";
export const PREVIOUS_QUESTION = "GET_PREVIOUS_QUESTION";
export const SUBMIT_RESULT_SUCCESSFUL = "SUBMIT_RESULT_SUCCESS";
export const SUBMIT_RESULT_FAIL = "SUBMIT_RESULT_FAIL";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

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


export function takeTest(testId){
  const token = sessionStorage.getItem('token')
  return async dispatch => {
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
            type: GET_TEST,
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
    return fetch('/result',{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
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
        if(res.status === 500) {
          dispatch({
            type: SUBMIT_RESULT_FAIL,
          })
        }
      });
  };
}
