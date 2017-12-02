import { GET_CURRENT_USER_RESULT_SUCCESSFUL, GET_CURRENT_USER_RESULT_FAIL } from "../actions/authentication-actions";

export function resultReducer(state = [], action) {
  switch (action.type) {
      case GET_CURRENT_USER_RESULT_SUCCESSFUL:
          state = action.result
          return state
      default:
          return state
  }
}
