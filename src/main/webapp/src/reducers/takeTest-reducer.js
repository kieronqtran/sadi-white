import {GET_TEST,
        GET_TEST_ERROR,
        NEXT_QUESTION,
        PREVIOUS_QUESTION,
        SUBMIT_RESULT_SUCCESSFUL,
        SUBMIT_RESULT_FAIL,
        ANSWER_QUESTION} from '../actions/takeTest-actions';

export default function newQuestion(state={}, action){
  switch(action.type){
    case GET_TEST:
      console.log("")
      return {...state, currentTest: action.test};
    case GET_TEST_ERROR:
      console.log("Does not exist this test");
      return {...state, currentTest: action.test};
    case ANSWER_QUESTION:
      console.log("Answered one question");
      const new_answer = state.takeTest.answer;
      new_answer[action.questionId] = action.answerId;
      return {...state, answer: new_answer}
    case NEXT_QUESTION:
      console.log("Next question");
      return {...state, currentQuestion: state.takeTest.currentQuestion + 1};
    case PREVIOUS_QUESTION:
      console.log("Previous question");
      return {...state, currentQuestion: state.takeTest.currentQuestion - 1};
    case SUBMIT_RESULT_SUCCESSFUL:
      console.log("Submit answer of test succeed");
      return {...state, answer_test: {testId: state.takeTest.currentTest.id, answer: state.takeTest.answer}}
    case SUBMIT_RESULT_FAIL:
      console.log("Submit answer of test failed");
      return state; // quick fixed

    default:
      return state;
  }
}
