// generate test form with start button, click start, display question and answers
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionForm from './components/Question.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import {testSample} from 'variables/mockData.js'
import { connect } from 'react-redux'
import {NEXT_QUESTION, PREVIOUS_QUESTION, ANSWER_QUESTION
, START_COUNTDOWN
  , submitTest, takeTest, answerQuestion, nextQuestion, previousQuestion} from '../../actions/takeTest-actions'

class TestForm extends Component {
  constructor(props) {
    super(props);

    this.nextQuestion = this.nextQuestion.bind(this);
    this.previousQuestion = this.previousQuestion.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
  }

  componentWillMount(){
    this.props.takeTest(this.props.match.params.testId);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if(nextProps.testLoaded && !nextProps.countdownStarted && nextProps.currentTest.testTime > 0) {
      this.props.startCountDown();
      const testTime = nextProps.currentTest.testTime/100;
        console.log(testTime)
        const com = this;
        var a = 0
        var t = setInterval(function(){
          a = a + 1000;
          console.log(a);
          if(a === testTime){
            clearInterval(t);
            alert("You will be now redirected to the user page")
            com.submit("#!/user");
          
          }}, 1000);
        
      return true;
    }
    return true;
  }

  nextQuestion() {
    this.props.nextQuestion()
  }

  previousQuestion() {
    this.props.previousQuestion()
  }

  answerQuestion(questionId, answerId){
    this.props.answerQuestion(questionId, answerId)
  }

  submit(){
    const finalResult = {testId: this.props.currentTest.id,
                          answerId: Object.values(this.props.answer)};
    this.props.submitTest(finalResult);
  }

  render() {
    const setResult = this.answerQuestion.bind(this);
    const { onSubmit, currentQuestion, currentTest } = this.props;

    return (
      <div className="content">
        {currentQuestion < currentTest.size && (
          <QuestionForm
            previousQuestion={this.previousQuestion.bind(this)}
            onSubmit={this.nextQuestion}
            test={currentTest}
            currentQuestion={currentQuestion}
            setResult={this.answerQuestion.bind(this)}
          />
        )}
        {currentQuestion === currentTest.size && (
          <QuestionForm
            previousQuestion={this.previousQuestion}
            onSubmit={this.submit.bind(this)}
            test={currentTest}
            currentQuestion={currentQuestion}
            setResult={setResult}
          />
        )}
      </div>
    )
  }
}

TestForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    currentTest: state.takeTest.currentTest,
    currentQuestion: state.takeTest.currentQuestion,
    answer: state.takeTest.answer,
    testLoaded: state.takeTest.loaded,
    countdownStarted: state.takeTest.countdownStarted,
  };
}

export default connect(mapStateToProps, {
  takeTest, submitTest, nextQuestion, previousQuestion, answerQuestion,
  startCountDown: () => ({
    type: START_COUNTDOWN
  })})(TestForm);
