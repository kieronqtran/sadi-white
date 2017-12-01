import {GET_TEST,
        GET_TEST_ERROR,
        NEXT_QUESTION,
        PREVIOUS_QUESTION,
        SUBMIT_RESULT_SUCCESSFUL,
        SUBMIT_RESULT_FAIL,
        ANSWER_QUESTION} from '../actions/takeTest-actions';

// TODO: create an empty state over here b/c so that in the components won't throught null exeception
const initValue = {
  currentTest: {},
  currentQuestion: 1,
  answer: {},
};
export default function newQuestion(state= initValue, action){
  switch(action.type){
    case GET_TEST:
      console.log("")
      return {...state, currentTest: action.test};
    case GET_TEST_ERROR:
      console.log("Does not exist this test");
      return {...state, currentTest: initValue.currentTest};
    case ANSWER_QUESTION:
      console.log("Answered one question");
      var new_answer = state.answer;
      new_answer[action.questionId] = action.answerId;
      return {...state, answer: new_answer}
    case NEXT_QUESTION:
      console.log("Next question");
      return {...state, currentQuestion: state.currentQuestion + 1};
    case PREVIOUS_QUESTION:
      console.log("Previous question");
      return {...state, currentQuestion: state.currentQuestion - 1};
    case SUBMIT_RESULT_SUCCESSFUL:
      console.log("Submit answer of test succeed");
      return {...state, answer_test: {testId: state.currentTest.id, answer: state.answer}};
    case SUBMIT_RESULT_FAIL:
      console.log("Submit answer of test failed"); // should return error message
      
    default:
      return {...state, currentTest: initValue.currentTest, currentQuestion: initValue.currentQuestion, answer: initValue.answer, };
  }
}
