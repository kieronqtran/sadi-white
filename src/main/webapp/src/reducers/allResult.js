import {
  GET_ALL_RESULT_SUCCESSFUL,
} from '../actions/authentication-actions'

export default function allResultReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_RESULT_SUCCESSFUL:
      state = action.allResults
      return state
    default:
      return state
  }
}
