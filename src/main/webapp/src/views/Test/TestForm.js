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
import {NEXT_QUESTION, PREVIOUS_QUESTION, ANSWER_QUESTION, submitTest, takeTest} from '../../actions/takeTest-actions'

class TestForm extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.params.testId);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.previousQuestion = this.previousQuestion.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
    this.props.takeTest(this.props.params.testId);
  }
  nextQuestion() {
    this.dispatch(
      {
        type: NEXT_QUESTION,
      }
    )
  }

  previousQuestion() {
    this.dispatch(
      {
        type: PREVIOUS_QUESTION,
      }
    )
  }

  answerQuestion(questionId, answerId){
    this.dispatch(
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
        {currentQuestion < test.size && (
          <QuestionForm
            previousQuestion={this.previousQuestion.bind(this)}
            onSubmit={this.nextQuestion}
            test={test}
            currentQuestion={currentQuestion}
            setResult={this.answerQuestion.bind(this)}
          />
        )}
        {currentQuestion === test.size && (
          <QuestionForm
            previousQuestion={this.previousQuestion}
            onSubmit={this.submitTest.bind(this)}
            test={test}
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


function mapStateToProps(state) {
  return {
    // currentTest: state.takeTest.currentTest,
    // currentQuestion: state.takeTest.currentQuestion,
    // answer: state.takeTest.answer,
  };
}

export default connect(mapStateToProps, {takeTest, submitTest})(TestForm);
