export const GET_LIST_TEST = "RECEIVED_LIST_TEST";
export const GET_LIST_TEST_ERROR = "FAILED_TO_RECEIVE_LIST_TEST";


export function getListTest(){
	return async dispatch => {
		const token = sessionStorage.getItem('token')
		const response = await fetch('/api/testings', {
		  method: 'GET',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		    Authorization: `Bearer ${token}`,
		  },
		})
		const data = await response.json()
			if (response.status === 200) {
				return dispatch({ type: GET_LIST_TEST, testList: data })
			} else {
				dispatch({ type: GET_LIST_TEST_ERROR, error: "error 500 or 401 or 404"});
			}
		}
	}
