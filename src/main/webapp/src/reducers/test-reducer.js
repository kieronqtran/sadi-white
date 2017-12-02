import {
  GET_LIST_TEST,
  GET_LIST_TEST_ERROR,
} from '../actions/test-actions.js';

const defaultList = { testList: [] }
export default function getTestList(state = defaultList, action){
  switch(action.type){
    case GET_LIST_TEST:
      console.log(state)
      console.log(action.testList)
      return {testList: action.testList};
    case GET_LIST_TEST_ERROR:
      return {testList: []}
    default:
      return state;
  }
}
