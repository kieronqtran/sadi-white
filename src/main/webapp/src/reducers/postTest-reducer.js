import {
  POST_TEST_SUCCESSFUL,
  GET_LIST_TEST,
  GET_LIST_TEST_ERROR,
  POST_TEST_FAIL,
  PUT_TEST_FAIL,
  PUT_TEST_SUCCESSFUL,
  DELETE_TEST_FAIL,
  DELETE_TEST_SUCCESSFUL} from '../actions/testing-restful'

const defaultValue = {
  listTest: []
}
export default function manageTest (state = defaultValue, action) {
  switch (action.type) {
    case POST_TEST_SUCCESSFUL:
      return { ...state };
    case POST_TEST_FAIL:
      return { ...state };
    case PUT_TEST_SUCCESSFUL:
      return { ...state };
    case PUT_TEST_FAIL:
      return { ...state };
    case DELETE_TEST_FAIL:
      return { ...state };
    case DELETE_TEST_SUCCESSFUL:
      return { ...state };
    case GET_LIST_TEST:
      return { ...state, listTest: action.testList }
    case GET_LIST_TEST_ERROR:
      return { ...state, listTest: defaultValue.listTest, error: action.error };
    }
    return state;
  }
