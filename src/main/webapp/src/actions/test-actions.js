export const GET_LIST_TEST = "FETCHING_LIST_TEST";
export const GET_LIST_TEST_SUCCESSFUL = "RECEIVED_LIST_TEST";
export const GET_LIST_TEST_ERROR = "FAILED_TO_RECEIVE_LIST_TEST";

export function getListTest(){
	return async dispatch => {
    const token = sessionStorage.getItem('token')
    dispatch({ type: GET_LIST_TEST })
    const res = await fetch('/api/testings',{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    try {
      dispatch({ type: GET_LIST_TEST_SUCCESSFUL, testList: data })
    } catch (error) {
      dispatch({ type: GET_LIST_TEST_ERROR, error: error.message })
    }
  }
}
