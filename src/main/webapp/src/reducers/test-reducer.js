import {
  GET_LIST_TEST,
  GET_LIST_TEST_ERROR,
} from '../actions/test-actions.js';

export default function getTestList(state = {}, action){
  switch(action.type){
    case GET_LIST_TEST:
      console.log(state)
      console.log(action.testList)
      return {testList: action.testList};
    case GET_LIST_TEST_ERROR:
      return {testList: {}}
      console.log(action.error);
  }
  return state;
}
