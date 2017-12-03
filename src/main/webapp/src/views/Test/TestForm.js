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
    console.log(this.props.match.params.testId);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.previousQuestion = this.previousQuestion.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
    this.props.takeTest(this.props.match.params.testId);
  }
  nextQuestion() {
    this.props.nextQuestion()
  }

  timeout(timer){
    var time = 0;
    time = time + 1000;
    if(time === 10000){
      if (window.confirm("You will be redirected back to user account page, press cancel if you want to go back to test page") == true) {
          this.props.submit("#!/user");
      } else {
          this.props.submit("#!/test");
      }
    }

  }

  previousQuestion() {
    this.props.previousQuestion()
  }

  answerQuestion(questionId, answerId){
    this.props.answerQuestion(questionId, answerId)
  }

  submit(goTo = "#!/user"){
    const finalResult = {testId: this.props.currentTest.id,
                          answerId: Object.values(this.props.answer)};
    this.props.submitTest(finalResult, goTo);
  }

  render() {
    const setResult = this.answerQuestion.bind(this);
    const { onSubmit, currentQuestion, currentTest } = this.props;
    var timer = window.setInterval(this.timeout(timer), 1000);
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
