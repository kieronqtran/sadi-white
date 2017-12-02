import {
  GET_LIST_TEST,
  GET_LIST_TEST_ERROR,
} from '../actions/test-actions.js';

const defaultList = { testList: [] } // should create the default state 1st
export default function getTestList(state = defaultList, action){
  switch(action.type){
    case GET_LIST_TEST:
      console.log(state)
      console.log(action.testList)
      return {testList: action.testList};
    case GET_LIST_TEST_ERROR:
      return {testList: defaultList.testList}
      console.log(action.error); // why console.log after the return has been called ???
  }
  return state;
}
