// generate test form with start button, click start, display question and answers
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionForm from './components/Question.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Grid, Row, Col } from "react-bootstrap";
import {testSample} from 'variables/mockData.js'
import { connect } from 'react-redux'
import {NEXT_QUESTION, PREVIOUS_QUESTION, ANSWER_QUESTION
, START_COUNTDOWN,
  STOP_COUNTDOWN,
  submitTest, takeTest, answerQuestion, nextQuestion, previousQuestion} from '../../actions/takeTest-actions'
import Card from "../../components/Card/Card";
import Countdown from "./components/Countdown";

class TestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    }
    this.nextQuestion = this.nextQuestion.bind(this);
    this.previousQuestion = this.previousQuestion.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
  }

  componentWillMount(){
    this.props.takeTest(this.props.match.params.testId);
  }

  componentWillUnmount() {
    !this.state.submitted && this.onCountdownComplete()
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if(nextProps.testLoaded && !nextProps.countdownStarted && nextProps.currentTest.testTime > 0) {
      this.props.startCountDown();
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
    this.props.stopCountDown();
    this.setState({submitted: true})
    const finalResult = {testId: this.props.currentTest.id,
                          answerId: Object.values(this.props.answer)};
    this.props.submitTest(finalResult);
  }

  onCountdownClick(timeLeft) {
    console.log('Timeleft: ', timeLeft);
  }

  onCountdownComplete() {
    alert("You will be now redirected to the user page");
    this.submit();
  }

  render() {
    const setResult = this.answerQuestion.bind(this);
    const { onSubmit, currentQuestion, currentTest } = this.props;
    const {child} = this;
    this.child && this.props.countdownStarted && child.startTimer()
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <div className="card">
                <div className="header">
                    <h4 className="title">Test Name: {this.props.currentTest.name}
                      <div className="pull-right">
                      {this.props.currentTest.testTime && <Countdown
                        onRef={instance => { this.child = instance; }}
                        seconds={this.props.currentTest.testTime/1000}
                        onTick={this.onCountdownClick.bind(this)}
                        onComplete={this.onCountdownComplete.bind(this)}/>}
                      </div>
                    </h4>
                    <p className="category">Question number {currentQuestion} out of {currentTest.size}</p>
                </div>
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
              </div>
            </Col>
          </Row>
        </Grid>
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
  }),
  stopCountDown: () => ({
    type: STOP_COUNTDOWN
  })
})(TestForm);
