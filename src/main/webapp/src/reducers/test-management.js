import {
  GET_TEST_BY_ID_FETCH,
  GET_TEST_BY_ID_SUCCESSFUL,
  GET_TEST_BY_ID_ERROR,
  POST_TEST_SUCCESSFUL,
  GET_LIST_TEST,
  GET_LIST_TEST_ERROR,
  POST_TEST_FAIL,
  PUT_TEST_FAIL,
  PUT_TEST_SUCCESSFUL,
  DELETE_TEST_FAIL,
  DELETE_TEST_SUCCESSFUL} from '../actions/testing-restful'

const defaultValue = {
  listTest: [],
  test: {},
  loading: false,
  loaded: false,
}
export default (state = defaultValue, action) => {
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
    case GET_TEST_BY_ID_FETCH:
      return { ...state, loading: true }
    case GET_TEST_BY_ID_SUCCESSFUL:
      return {...state, test: action.data, loaded: true, loading: false};
    case GET_TEST_BY_ID_ERROR:
      return {...state, test: defaultValue.test, loaded: false, loading: false};
    case GET_LIST_TEST:
      return { ...state, listTest: action.testList }
    case GET_LIST_TEST_ERROR:
      return { ...state, listTest: defaultValue.listTest, error: action.error };
    }
    return state;
  }
