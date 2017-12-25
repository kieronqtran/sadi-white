import {GET_TEST_FETCH,
        GET_TEST_SUCCESSFUL,
        GET_TEST_ERROR,
        NEXT_QUESTION,
        PREVIOUS_QUESTION,
        SUBMIT_RESULT_SUCCESSFUL,
        SUBMIT_RESULT_FAIL,
        START_COUNTDOWN,
        ANSWER_QUESTION} from '../actions/takeTest-actions';

const initState = {
  currentTest: {
    id:0,
    name:'',
    type:'',
    testTime: 0,
    size: 0,
    questions: []
  },
  answer: {},
  currentQuestion: 1,
  loaded: false,
  loading: false,
  countdownStarted: false,
}
export default function newQuestion(state=initState, action){
  switch(action.type){
    case GET_TEST_FETCH:
      return { ...state, loading: true }
    case GET_TEST_SUCCESSFUL:
      return {...state, currentTest: action.test, loaded: true, loading: false};
    case GET_TEST_ERROR:
      return {...state, currentTest: initState.currentTest, loaded: false, loading: false};
    case ANSWER_QUESTION:
      var new_answer = state.answer;
      new_answer[action.ans.question] = action.ans.answer;
      return {...state, answer: new_answer}
    case NEXT_QUESTION: {
      const new_question = state.currentQuestion + 1;
      return {...state, currentQuestion:  new_question};
    }
    case PREVIOUS_QUESTION: {
      const new_question = state.currentQuestion - 1;
      return {...state, currentQuestion:  new_question};
    }
    case SUBMIT_RESULT_SUCCESSFUL:
      return { ...state, currentTest: initState.currentTest, answer: {}}
    case SUBMIT_RESULT_FAIL:
      return { ...state, answer_test: {}};
    case START_COUNTDOWN:
      return {...state, countdownStarted: true};
    default:
      return state;
  }
}
