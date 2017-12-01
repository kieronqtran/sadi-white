import {
  GET_LIST_TEST,
  GET_LIST_TEST_ERROR,
} from '../actions/test-actions.js';

const defaultList = { testList: [] }
export default function getTestList(state = {}, action){
  switch(action.type){
    case GET_LIST_TEST:
      console.log(action.testList)
      return {...state, testList: action.testList};
    case GET_LIST_TEST_ERROR:
      return {testList: defaultList.testList};
    default:
      return {testList: defaultList.testList};
  }
}
