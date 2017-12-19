import {
  GET_ALL_RESULT_SUCCESSFUL,
} from '../actions/authentication-actions'

export default function allResultReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_RESULT_SUCCESSFUL:
      state = action.allResults.sort(function (a,b) {
         return ((b.numberOfCorrectAnswer/b.size)-(a.numberOfCorrectAnswer/a.size))
      })
      return state
    default:
      return state
  }
}
