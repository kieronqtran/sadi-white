import {
  GET_LIST_TEST,
  GET_LIST_TEST_SUCCESSFUL,
  GET_LIST_TEST_ERROR,
  START_COUNTDOWN,
} from '../actions/test-actions.js';

const defaultList = { 
  testList: [],
  loaded: false,
  loading: false,
}
export default function getTestList(state = defaultList, action){
  switch(action.type){
    case GET_LIST_TEST:
      return {
        ...state,
        loading: true,
      }
    case GET_LIST_TEST_SUCCESSFUL:
      return {
        ...state,
        testList: action.testList,
        loaded: true,
        loading: false,
      };
    case GET_LIST_TEST_ERROR:
      return {
        ...state,
        testList: defaultList.testList,
        loaded: false,
        loading: false,
      }
    default:
      return state;
  }
}
