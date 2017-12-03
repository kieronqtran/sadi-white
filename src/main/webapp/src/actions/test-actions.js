export const GET_LIST_TEST = "RECEIVED_LIST_TEST";
export const GET_LIST_TEST_ERROR = "FAILED_TO_RECEIVE_LIST_TEST";

export function getListTest(){
	return async dispatch => {
    const token = sessionStorage.getItem('token')
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
