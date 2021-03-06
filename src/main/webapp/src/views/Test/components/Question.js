// generate test form with start button, click start, display question and answers
import React from 'react'
import { Field, reduxForm } from 'redux-form'
/*import validate from './validate';*/
import answerForm from './Answer'
import Card from 'components/Card/Card'

const QuestionForm = props => {
  const {
    handleSubmit,
    test,
    currentQuestion,
    previousQuestion,
    setResult,
  } = props

  const nameQuestion =
    'question' +
    test.questions[currentQuestion-1].id.toString()

  return (
    <div className="card">
      <div className="header">
        <h3 className="title text-success">
          {test.questions[currentQuestion-1].content}
        </h3>
      </div>
      <div className="content">
        <form>
          <table className="table">
            <tbody>
              {test.questions[currentQuestion-1]
                .answers.map(ans => (
                  <Field
                    key={ans.id}
                    nameQues={nameQuestion}
                    quesId={currentQuestion}
                    name={nameQuestion}
                    value={ans.id}
                    component={answerForm}
                    label={ans.content}
                    setNewResult={({ questionId, answerId }) => event =>
                      setResult(test.questions[currentQuestion-1].id.toString(), ans.id)}
                  />
                ))}
            </tbody>
          </table>
          <div>
            {currentQuestion < test.size && (
              <button
                type="submit"
                className="btn-fill pull-right btn btn-info"
                onClick={handleSubmit}
              >
                Next
              </button>
            )}
            {currentQuestion === test.size && (
              <button
                type="submit"
                className="btn-fill pull-right btn btn-success"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
            {currentQuestion > 1 && (
              <button
                type="submit"
                className="btn-fill pull-right btn btn-warning"
                onClick={previousQuestion}
              >
                Previous
              </button>
            )}
          </div>
          <div className="clearfix" />
        </form>
      </div>
    </div>
  )
}

export default reduxForm({
  form: 'takingTest',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(QuestionForm)
