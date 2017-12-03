import {
  GET_RESULT_SUCCESSFUL,
  GET_RESULT_ERROR
} from '../actions/authentication-actions'

export default function resultReducer(state = [], action) {
  switch (action.type) {
    case GET_RESULT_SUCCESSFUL:
      state = action.result
      return state
    default:
      return state
  }
}
