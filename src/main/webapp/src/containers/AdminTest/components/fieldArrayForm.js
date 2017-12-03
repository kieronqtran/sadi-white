import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import {
  Col, Button, Form, FormGroup, HelpBlock, FormControl, ControlLabel, Panel, PanelGroup
} from 'react-bootstrap';
import validate from './validate';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <FormGroup>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...input} type={type} />
    {touched && error && <HelpBlock>{error}</HelpBlock>}
  </FormGroup>
);

const renderAnswers = ({ fields, meta: { error } }) => (
  <div>
    <div>
      <Button beStyle='success' onClick={() => fields.push({'isCorrectAnswer':true})}>True Answer</Button>
      <Button beStyle="danger" onClick={() => fields.push({ 'isCorrectAnswer': false })}>False Answer</Button>
    </div>
    {fields.map((answer, index) => (
      <div key={index}>
        {answer.isCorrectAnswer === true &&
          <Field
            name={`${answer}.content`}
            type="text"
            component={renderField}
            label={`True Answer`}
          />
        }
        {answer.isCorrectAnswer === false &&
          <Field
            name={`${answer}.content`}
            type="text"
            component={renderField}
            label={`False Answer`}
          />

        }
      </div>
    ))}
    {error && <HelpBlock className="error">{error}</HelpBlock>}
  </div>
);

{/*<Button*/}
{/*type="button"*/}
{/*title="Remove Answer"*/}
{/*onClick={() => fields.remove(index)}*/}
{/*/>*/}

const renderQuestions = ({ fields, meta: { touched, error, submitFailed } }) => (
  <FormGroup>
    <Col md={3}>
      <Button beStyle='primary' onClick={() => fields.push({})}>Add Questions</Button>
      {(touched || submitFailed) && error && <HelpBlock>{error}</HelpBlock>}
    </Col>
    <Col md={9}>
      {fields.map((question, index) => (
        <PanelGroup defaultActiveKey={index} accordion>
          <Panel header={index+1} eventKey={index}>
            <Field
              name={`${question}.content`}
              type="text"
              component={renderField}
              label="Enter a question."
            />
            <FieldArray name={`${question}.answer`} component={renderAnswers} />
          </Panel>
        </PanelGroup>
      ))}
    </Col>
  </FormGroup>
);

const FieldArraysForm = props => {
  const { handleSubmit} = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="name"
        type="text"
        component={renderField}
        label="Test Name"
      />
      <Field
        name="duration"
        type="text"
        component={renderField}
        label="Test Duration"
      />
      <FieldArray name="questions" component={renderQuestions} />
    </Form>
  );
};

export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  validate,
})(FieldArraysForm);
