import {GET_TEST,
        GET_TEST_ERROR,
        NEXT_QUESTION,
        PREVIOUS_QUESTION,
        SUBMIT_RESULT_SUCCESSFUL,
        SUBMIT_RESULT_FAIL,
        ANSWER_QUESTION} from '../actions/takeTest-actions';

const initState = {currentTest: {
  id:0,
  name:'',
  type:'',
  testTime: 0,
  size: 0,
  questions: []
}, answer: {}, currentQuestion: 1}
export default function newQuestion(state=initState, action){
  switch(action.type){
    case GET_TEST:
      return {...state, currentTest: action.test};
    case GET_TEST_ERROR:
      return {...state, currentTest: initState.currentTest};
    case ANSWER_QUESTION:
      var new_answer = state.answer;
      new_answer[action.ans.question] = action.ans.answer;
      return {...state, answer: new_answer}
    case NEXT_QUESTION:
      var new_question = state.currentQuestion + 1;
      return {...state, currentQuestion:  new_question};
    case PREVIOUS_QUESTION:
      var new_question = state.currentQuestion - 1;
      return {...state, currentQuestion:  new_question};
    case SUBMIT_RESULT_SUCCESSFUL:
      return {...state, currentTest:initState.currentTest, answer: {}}
    case SUBMIT_RESULT_FAIL:
      return {...state, answer_test: {}};
    default:
      return state;
  }
}
