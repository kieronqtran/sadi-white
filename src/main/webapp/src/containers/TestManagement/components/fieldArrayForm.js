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

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <FormGroup>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...input} type={type} />
    {touched && error && <HelpBlock>{error}</HelpBlock>}
  </FormGroup>
);

const renderCheckBox = ({input, label, type, ...custom}) =>
(<Checkbox
  {...input}
  label={label}
  checked={!!input.value}
  onClick={(e, { checked }) => input.onChange(!checked)}
  {...custom}>The Correct Answer.</Checkbox>)

const renderAnswers = ({ fields, meta: { error } }) => (
  <div>
    <div>
      <Button bsStyle="primary" onClick={() => fields.push({ content: '', isCorrectAnswer: false})}>
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
          />
        </Col>
        <Col md={2}>
          <Button
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
            />{" "}
            is Correct Answer
          </label>
        </Col>
      </div>
    ))}
    {error && <HelpBlock className="error">{error}</HelpBlock>}
  </div>
);

const renderQuestions = ({
  fields,
  meta: { touched, error, submitFailed }
}) => (
  <FormGroup>
    <Col md={2}>
      <Button bsStyle="primary" onClick={() => fields.push({})}>
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
              />
            </Col>
            <Col md={2}>
              <Button
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
);

const FieldArraysForm = props => {
  const { handleSubmit, onClose } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="name"
        type="text"
        component={renderField}
        label="Test Name"
      />
      <Field
        name="testTime"
        type="text"
        component={renderField}
        label="Test Duration"
      />
      <Field
        name="type"
        type="text"
        component={renderField}
        label="Test Type"
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
