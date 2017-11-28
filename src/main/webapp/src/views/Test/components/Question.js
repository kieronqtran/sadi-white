// generate test form with start button, click start, display question and answers
import React from 'react';
import { Field, reduxForm } from 'redux-form';
/*import validate from './validate';*/
import answerForm from './Answer';
import Card from 'components/Card/Card'

const QuestionForm = props => {
  const { handleSubmit, test, currentQuestion, previousQuestion } = props;
  console.log(currentQuestion);
  console.log(test);
  const nameQuestion = "question" + test.questions.find(e => e.id === currentQuestion).id.toString();
  console.log(nameQuestion);
  return (
    <div className="card">
      <div className="header">
        <h3 className="title text-info">
          {test.questions.find(e => e.id === currentQuestion).content}
        </h3>
      </div>
      <div className="content">
      <form>

        <table className="table">
          <tbody>
            {test.questions.find(e => e.id === currentQuestion).answers.map(ans =>
              <Field
                key={ans.id}
                nameQues={nameQuestion}
                name={nameQuestion}
                value={ans.id}
                component={answerForm}
                label={ans.content}
              />
            )}
          </tbody>
        </table>
        <div>
          {currentQuestion < test.size && <button type="submit" className="btn-fill pull-right btn btn-info"  onClick={handleSubmit}>Next</button>}
          {currentQuestion > 1 && <button type="submit" className="btn-fill pull-right btn btn-warning" onClick={previousQuestion}>Previous</button>}
        </div>
        <div className="clearfix"></div>
      </form>
      </div>
    </div>

  );
};

export default reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount

})(QuestionForm);
