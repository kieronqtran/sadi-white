// generate test form with start button, click start, display question and answers
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionForm from './components/Question.js';

// import Card from 'components/Card/Card'
import {testSample} from 'variables/mockData.js'


class TestForm extends Component {
  constructor(props) {
    super(props);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.previousQuestion = this.previousQuestion.bind(this);
    this.state = {
      currentQuestion: 1,
      test: testSample,
      testID : this.props.match.params.testId,
    };
  }
  nextQuestion() {
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
    });
  }

  previousQuestion() {
      this.setState({
        currentQuestion: this.state.currentQuestion - 1 ,
      });
  }

  render() {
    console.log("here is the test ID: " + this.props.match.params.testId);
    console.log(this.props.match.params.testId);
    const { onSubmit } = this.props;
    const { currentQuestion, test } = this.state;
    return (
      <div className="content">
        {currentQuestion < test.size &&
          <QuestionForm
            previousQuestion={this.previousQuestion.bind(this)}
            onSubmit={this.nextQuestion}
            test={test}
            currentQuestion={currentQuestion}
          />}
        {currentQuestion === test.size &&
          <QuestionForm
            previousQuestion={this.previousQuestion}
            onSubmit={onSubmit}
            test={test}
            currentQuestion={currentQuestion}
          />}
      </div>
    );
  }
}

TestForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TestForm;
