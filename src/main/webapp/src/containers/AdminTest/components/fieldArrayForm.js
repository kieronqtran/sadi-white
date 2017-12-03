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

const renderAnswers = ({ fields, meta: { error } }) => {
	const answerField = fields.getAll() || [];
	return (<div>
    <div>
      <Button bsStyle='success' onClick={() => fields.push({'isCorrectAnswer':true})}>True Answer</Button>
      <Button bsStyle="danger" onClick={() => fields.push({ 'isCorrectAnswer': false })}>False Answer</Button>
    </div>
    {answerField.map((answer, index) => (
      <div key={index}>
        {answer.isCorrectAnswer &&
					<div>
						<Col md={10}>
							<Field
								name={`questions[0].answer[${index}].content`}
								type="text"
								component={renderField}
								label={`True Answer`}
							/>
						</Col>
						<Col md={2}>
							<Button
							bsStyle='danger'
							type="button"
							title="Remove Answer"
							onClick={() => fields.remove(index)}>X</Button>
						</Col>
					</div>
				}
        {!answer.isCorrectAnswer &&
          <div>
						<Col md={10}>
							<Field
								name={`answer[${index}].content`}
								type="text"
								component={renderField}
								label={`False Answer`}
							/>
						</Col>
						<Col md={2}>
							<Button
							bsStyle='danger'
							type="button"
							title="Remove Answer"
							onClick={() => fields.remove(index)}>X</Button>
						</Col>
					</div>
        }
      </div>
    ))}
    {error && <HelpBlock className="error">{error}</HelpBlock>}
  </div>
)
};

const renderQuestions = ({ fields, meta: { touched, error, submitFailed } }) => (
  <FormGroup>
    <Col md={2}>
      <Button bsStyle='primary' onClick={() => fields.push({})}>Add Questions</Button>
      {(touched || submitFailed) && error && <HelpBlock>{error}</HelpBlock>}
    </Col>
    <Col md={10}>
      {fields.map((question, index) => (
        <PanelGroup defaultActiveKey={index} accordion>
          <Panel header={index+1} eventKey={index}>
					<Col md={10}>
            <Field
              name={`question[${index}].content`}
              type="text"
              component={renderField}
              label="Enter a question." />
					</Col>
					<Col md={2}>
						<Button
							bsStyle='danger'
							type="button"
							title="Remove Question"
							onClick={() => fields.remove(index)}>X</Button>
					</Col>
					<Col md={12}>
						<FieldArray name={`question[${index}].answer`} component={renderAnswers} />
					</Col>
          </Panel>
        </PanelGroup>
      ))}
    </Col>
  </FormGroup>
);

const FieldArraysForm = props => {
	var test = {testId: 0, testTime: 0, questions:{}}
  const { handleSubmit } = props;
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
			<div className="clearfix"></div>
    </Form>
  );
};

export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  validate,
})(FieldArraysForm);

