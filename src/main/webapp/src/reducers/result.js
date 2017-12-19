import {
  GET_RESULT_SUCCESSFUL,
  GET_RESULT_ERROR
} from '../actions/authentication-actions'

const initialValue = {
  entities: [],
  loading: false,
  loaded: false,
}

export default function resultReducer(state = initialValue, action) {
  switch (action.type) {
    case GET_RESULT_SUCCESSFUL: {
      return {
        ...state,
        entities: action.data,
        loading: false,
        loaded: true,
      }
    }
    case GET_RESULT_ERROR: {
      return {
        ...state,
        loading: false,
        loaded: false,
      }
    }
  }
  return state;
}
