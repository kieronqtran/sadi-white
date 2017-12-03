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
import {NEXT_QUESTION, PREVIOUS_QUESTION, ANSWER_QUESTION, submitTest, takeTest, answerQuestion, nextQuestion, previousQuestion} from '../../actions/takeTest-actions'

class TestForm extends Component {
  constructor(props) {
    super(props);

    this.nextQuestion = this.nextQuestion.bind(this);
    this.previousQuestion = this.previousQuestion.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
    this.props.takeTest(this.props.match.params.testId);
    const testTime = this.props.currentTest.testTime;
    const com = this;
    if(this.props.currentTest.size === 0){
    } else {
      var a = 0
      var t = setInterval(function(){
        a = a + 1000;
        if(a === testTime){
          clearInterval(t);
          com.submit("#!/user");
          alert("You will be now redirected to the user page")
        }
      }, 1000);
    }
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
  };
}

export default connect(mapStateToProps, {takeTest, submitTest, nextQuestion, previousQuestion, answerQuestion})(TestForm);
