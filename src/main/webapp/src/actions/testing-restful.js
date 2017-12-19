import docCookies from '../helper/cookie'

export const POST_TEST_SUCCESSFUL = "SUCCESS_POSTING_TEST";
export const POST_TEST_FAIL = "FAILED_TO_POST_TEST";
export const PUT_TEST_SUCCESSFUL = "SUCCESS_PUTTING_TEST";
export const PUT_TEST_FAIL = "FAILED_TO_PUT_TEST";
export const DELETE_TEST_SUCCESSFUL = "DELETE_TEST_SUCCESSFUL";
export const DELETE_TEST_FAIL = "FAILED_TO_DELETE_TEST";
export const GET_LIST_TEST = "SUCCESS_GET_LIST_TEST";
export const GET_LIST_TEST_ERROR = "GET_LIST_TEST_ERROR";
export const GET_TEST_BY_ID_ERROR = "GET_TEST_BY_ID_ERROR";
export const GET_TEST_BY_ID_FETCH = "GET_TEST_BY_ID_FETCH";
export const GET_TEST_BY_ID_SUCCESSFUL = "GET_TEST_BY_ID_SUCCESSFUL";

// this action is used by redux-form
export function createOrUpdateTest(values, dispatch) {
    console.log('Dispatch function: ',dispatch);
    if(values.id) {
      dispatch(putTest(values))
    } else {
      const test = { ...values, size: values.questions.length + 1}
      dispatch(postTest(values))
    }
    return dispatch(getListTest())
}

export function getTestById(id) {
  const token = docCookies.getItem('token')
  return async dispatch => {
    try {
      dispatch({ type: GET_TEST_BY_ID_FETCH })
      const response = await fetch(`/api/testings/${id}/admin`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      dispatch({ type: GET_TEST_BY_ID_SUCCESSFUL, data })
    } catch (error) {
      dispatch({ type: GET_TEST_BY_ID_ERROR, error: error.message })
    }
  }
}

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

export function getListTest(){
	return async dispatch => {
    const token = docCookies.getItem('token')
    const res = await fetch('/api/testings',{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    try {
      dispatch({ type: GET_LIST_TEST, testList: data })
    } catch (error) {
      dispatch({ type: GET_LIST_TEST_ERROR, error: error.message })
    }
  }
}

export function postTest(test){
  return function(dispatch) {
    const token = docCookies.getItem('token')
    return fetch('/api/testings',{
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
            type: POST_TEST_SUCCESSFUL,
          });
        }
        if(res.status === 500) {
          dispatch({
            type: POST_TEST_FAIL,
          })
        }
      });
  };
}

export function putTest(test) {
  return function(dispatch) {
    const token = docCookies.getItem('token')
    return fetch('/api/testings', {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify(test),
    })
      .then(res => {
        if (res.status === 201) {
          dispatch({
            type: PUT_TEST_SUCCESSFUL,
          });
        }
        if (res.status === 500) {
          dispatch({
            type: PUT_TEST_FAIL,
          })
        }
      });
  };
}

export function deleteTest(testId){
  return function(dispatch) {
    const token = docCookies.getItem('token')
    return fetch(`/api/testings/${testId}`,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    })
      .then(async res => {
        if(res.status === 200) {
          await dispatch(getListTest());
          return dispatch({
            type: DELETE_TEST_SUCCESSFUL,
          });
        }
        if(res.status === 500) {
          return dispatch({
            type: DELETE_TEST_FAIL,
          })
        }
      });
  };
}
