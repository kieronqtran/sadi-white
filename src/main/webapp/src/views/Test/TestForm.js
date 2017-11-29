// generate test form with start button, click start, display question and answers
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionForm from './components/Question.js';

// import Card from 'components/Card/Card'
import {testSample} from 'variables/mockData.js'
console.log(+window.location.href.slice(34));

// const testData =
class TestForm extends Component {
  constructor(props) {
    super(props);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.previousQuestion = this.previousQuestion.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
    this.state = {
      currentQuestion: 1,
      test: testSample.find(e => e.id === +(window.location.href.slice(34))),
      testID : this.props.match.params.testId,
      answer: {}
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

  answerQuestion(questionId, answerId){
    const temp = this.state.answer;
    temp[questionId] = answerId;
    this.setState({
      answer: temp,
    });
    console.log(this.state.answer);
  }

  submitTest(){
    const finalResult = {testId: this.state.test.id, answer: this.state.answer};
    console.log(finalResult);
  }

  render() {
    const setResult = this.answerQuestion.bind(this);
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
            setResult = {this.answerQuestion.bind(this)}
          />}
        {currentQuestion === test.size &&
          <QuestionForm
            previousQuestion={this.previousQuestion}
            onSubmit={this.submitTest.bind(this)}
            test={test}
            currentQuestion={currentQuestion}
            setResult = {setResult}
          />}
      </div>
    );
  }
}

TestForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TestForm;
