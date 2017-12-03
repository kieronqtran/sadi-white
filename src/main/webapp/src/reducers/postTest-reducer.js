import {POST_TEST_SUCCESSFUL, POST_TEST_FAIL} from '../actions/testing-restful'

export default function postTest (state={}, action) {
  switch (action.type) {
    case POST_TEST_SUCCESSFUL:
      return state;
    case POST_TEST_FAIL:
      return state;
  }
  return state;
}
