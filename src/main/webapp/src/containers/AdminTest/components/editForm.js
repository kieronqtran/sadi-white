import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import {
  Col, Button, Form, FormGroup, HelpBlock, FormControl, ControlLabel, Panel, PanelGroup, Row
} from 'react-bootstrap';
import { connect } from 'react-redux';

const data = {
  id: 1, name: 'assignment', size: 10, duration: 6000,
  questions: [
    {content: 'this is question 1', answer: [{content: 'true', isCorrectAnswer: true}, {content: 'false', isCorrectAnswer: false}]},
    {content: 'this is question 2', answer: [{content: 'true', isCorrectAnswer: true}, {content: 'false', isCorrectAnswer: false}]}
  ]
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <FormGroup>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...input} type={type} />
    {/*{touched && error && <HelpBlock>{error}</HelpBlock>}*/}
  </FormGroup>
);

const TestForm = props => {
  const { handleSubmit, onClose} = props;
  return (
    <Form>
      <Field
        name='name'
        type='text'
        label='Test Name'
        component={renderField}
      />
      <Field
        name='duration'
        type='text'
        label='Test Duration'
        component={renderField}
      />
      <FieldArray name='questions' component={renderQuestionForm}/>
      <Row>
        <Col className="col-md-12">
          <Button bsStyle="danger" className="pull-right" onClick={onClose}>
            Close
          </Button>{'  '}
          <Button bsStyle="primary" className="pull-right" onClick={handleSubmit}>
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  )
};

const renderQuestionForm = props => (
  <div>
    {data.questions.map((question, i) => (
      <FormGroup>
        <PanelGroup accordion>
          <Panel header={`Question ${i +1}`} eventKey={i}>
            <Field
              name = 'questions'
              type = 'text'
              component = {renderField}
              label = 'Question: '/>
            <FieldArray name='answer' component={renderAnswerForm}/>
          </Panel>
        </PanelGroup>
      </FormGroup>
    ))}
  </div>
);

const renderAnswerForm = props => (
  <div>
    {data.questions[0].answer.map((answer, index) => (
      <div>
        <Field
          name='answer'
          type='text'
          component={renderField}
          label={`Answer #${index+1}`}/>
        <label>
          <Field name='isCorrectAnswer' component='input' type='radio' value='true'/>{' '}True Answer
        </label>{' '}
        <label>
          <Field name='isCorrectAnswer' component='input' type='radio' value='false'/>{' '}False Answer
        </label>
      </div>
    ))}
  </div>
)

// export default reduxForm({
//   form: 'updateForm', // a unique identifier for this form
// })(TestForm);

const reduxUpdateForm = reduxForm({
  form: 'updateForm', // a unique identifier for this form
})(TestForm);

export default connect(
  (state) => ({
    initialValues: data
  })
)(reduxUpdateForm)
