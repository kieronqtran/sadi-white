import {
  GET_ALL_RESULT_SUCCESSFUL,
} from '../actions/authentication-actions'

const initialValues = {
  data: [],
  loading: false,
  loaded: false,
};

export default function allResultReducer(state = initialValues, action) {
  switch (action.type) {
    case GET_ALL_RESULT_SUCCESSFUL:
      return { ...state, data: action.data };
    default:
      return state
  }
}
