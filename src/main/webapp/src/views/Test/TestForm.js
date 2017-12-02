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
import {NEXT_QUESTION, PREVIOUS_QUESTION, ANSWER_QUESTION, submitTest, takeTest, nextQuestion, previousQuestion} from '../../actions/takeTest-actions'

class TestForm extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.match.params.testId);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.previousQuestion = this.previousQuestion.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
    this.props.takeTest(this.props.match.params.testId);
  }
  nextQuestion() {
    this.props.nextQuestion()
  }

  previousQuestion() {
    this.props.previousQuestion()
  }

  answerQuestion(questionId, answerId){
    this.props.dispatch(
      {
        type: ANSWER_QUESTION,
        action: {questionId, answerId},
      }
    )
  }

  submitTest(){
    // const finalResult = {this.currentTest.id, answer}
    // this.props.submitTest(finalResult);
    // console.log(finalResult);
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
            onSubmit={this.submitTest.bind(this)}
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
  console.log(state);
  return {
    currentTest: state.takeTest.currentTest,
    currentQuestion: state.takeTest.currentQuestion,
    answer: state.takeTest.answer,
  };
}

export default connect(mapStateToProps, {takeTest, submitTest, nextQuestion, previousQuestion})(TestForm);
