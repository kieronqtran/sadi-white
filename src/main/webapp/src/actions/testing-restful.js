import docCookies from '../helper/cookie'
export const POST_TEST_SUCCESSFUL = "SUCCESS_POSTING_TEST";
export const POST_TEST_FAIL = "FAILED_TO_POST_TEST";
export const DELETE_TEST_SUCCESSFUL = "DELETE_TEST_SUCCESSFUL";
export const DELETE_TEST_FAIL = "FAILED_TO_DELETE_TEST";
export const GET_LIST_TEST = "SUCCESS_GET_LIST_TEST";
export const GET_LIST_TEST_ERROR = "GET_LIST_TEST_ERROR";
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
    return fetch('/api/testings',{
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
