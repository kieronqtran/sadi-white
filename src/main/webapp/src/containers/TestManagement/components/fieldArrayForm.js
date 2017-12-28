import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import {
  Col,
  Button,
  Form,
  FormGroup,
  HelpBlock,
  FormControl,
  ControlLabel,
  Panel,
  Checkbox,
  PanelGroup,
  Row
} from "react-bootstrap";
import validate from "./validate";
import { createOrUpdateTest as submit } from "../../../actions/testing-restful";

const required = value => (value ? undefined : 'Required')

const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined

const milisecondsCheck = value =>
value < 1000 ? 'Time is less than a second ?' : undefined

const minuteCheck = value =>
value < 60000 ? 'Time is less than a minute ?' : undefined

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <FormGroup>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...input} type={type} />
    {touched && error && <HelpBlock>{error}</HelpBlock>}
    {touched && warning && <HelpBlock>{warning}</HelpBlock>}
  </FormGroup>
);

const renderCheckBox = ({input, label, type, ...custom}) =>
(<Checkbox
  {...input}
  label={label}
  checked={!!input.value}
  onClick={(e, { checked }) => input.onChange(!checked)}
  {...custom}>The Correct Answer.</Checkbox>)

const renderAnswers = ({ fields, meta: { error } }) => {
  if(fields.length === 0) {
    new Array(4)
      .fill({ content: '', isCorrectAnswer: false })
      .map((e, i)=> i === 0 ? { content: '', isCorrectAnswer: true }: e)
      .forEach(e => fields.push(e))
  }
  return (
  <div>
    <div>
      <Button bsStyle="primary" className="btn-fill" onClick={() => fields.push({ content: '', isCorrectAnswer: false})}>
        Add Answer
      </Button>
    </div>
    {fields.map((answer, index) => (
      <div key={index}>
        <Col md={10}>
          <Field
            name={`${answer}.content`}
            type="text"
            component={renderField}
            label={`Answer #${index + 1}`}
            validate={required}
          />
        </Col>
        <Col md={2}>
          <Button
            className="btn-fill"
            bsStyle="danger"
            type="button"
            title="Remove Answer"
            onClick={() => fields.remove(index)}
          >
            Delete Answer
          </Button>
        </Col>
        <Col md={12}>
          <label>
            <Field
              name={`${answer}.isCorrectAnswer`}
              component="input"
              type="checkbox"
              value="true"
              validate={required}
            />{" "}
            is Correct Answer
          </label>
        </Col>
      </div>
    ))}
    {error && <HelpBlock className="error">{error}</HelpBlock>}
  </div>
)};

const renderQuestions = ({
  fields,
  meta: { touched, error, submitFailed }
}) => {
  if(fields.length === 0) {
    new Array(2).fill({}).forEach(e => fields.push(e))
  }
  return (
  <FormGroup>
    <Col md={2}>
      <Button className="btn-fill" bsStyle="primary" onClick={() => fields.push({})}>
        Add Questions
      </Button>
      {(touched || submitFailed) && error && <HelpBlock>{error}</HelpBlock>}
    </Col>
    <Col md={10}>
      {fields.map((question, index) => (
        <PanelGroup defaultActiveKey={index} accordion>
          <Panel header={`Question ${index + 1}`} eventKey={index}>
            <Col md={10}>
              <Field
                name={`${question}.content`}
                type="text"
                component={renderField}
                label="Enter a question."
                validate={required}
              />
            </Col>
            <Col md={2}>
              <Button
                className="btn-fill"
                bsStyle="danger"
                type="button"
                title="Remove Question"
                onClick={() => fields.remove(index)}
              >
                Delete Question
              </Button>
            </Col>
            <Col md={12}>
              <FieldArray
                name={`${question}.answers`}
                component={renderAnswers}
              />
            </Col>
          </Panel>
        </PanelGroup>
      ))}
    </Col>
  </FormGroup>
)};

const FieldArraysForm = props => {
  const { handleSubmit, onClose } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="name"
        type="text"
        component={renderField}
        label="Test Name:"
      />
      <Field
        name="testTime"
        type="number"
        component={renderField}
        label="Test Duration (in miliseconds - a second * 1000):"
        validate={required, number, milisecondsCheck}
        warn={minuteCheck}
      />
      <Field
        name="type"
        type="text"
        component={renderField}
        label="Test Type:"
      />
      <FieldArray name="questions" component={renderQuestions} />
      <div className="clearfix" />
    </Form>
  );
};

export default reduxForm({
  form: "adminTestForm",
  validate,
  onSubmit: submit // submit function must be passed to onSubmit
})(FieldArraysForm);
