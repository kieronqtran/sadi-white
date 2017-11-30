export const GET_LIST_TEST = "RECEIVED_LIST_TEST";
export const GET_LIST_TEST_ERROR = "FAILED_TO_RECEIVE_LIST_TEST";

export function getListTest(){
    return async dispatch => {
    const res = await fetch('/api/test')
    const data = await res.json()
    console.log(data)
    try {
      dispatch({ type: GET_LIST_TEST, testList: data })
    } catch (error) {
      dispatch({ type: GET_LIST_TEST_ERROR, error: error.message })
    }
  }
}
