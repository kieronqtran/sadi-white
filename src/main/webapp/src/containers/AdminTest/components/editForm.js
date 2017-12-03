import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import {
  Col, Button, Form, FormGroup, HelpBlock, FormControl, ControlLabel
} from 'react-bootstrap';
import { testData } from '../../../variables/mockData'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <FormGroup>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...input} type={type} />
    {/*{touched && error && <HelpBlock>{error}</HelpBlock>}*/}
  </FormGroup>
);

const renderTestDetail = props => {
  return (
    <div>
      <Field
        name='name'
        type='text'
        label='Test name: '
        component={renderField}
        input={testData.name}
      />
      <Field
        name='duration'
        type='text'
        label='Duration: '
        component={renderField}
        input={testData.duration}
      />
      <Field
        name='testContent'
        type='text'
        component={renderQuestionForm}
      />
    </div>
  )
};

const renderQuestionForm = ({testData}) => (
  <div>
    {testData.questions.map((e, i) => (
      <FormGroup>
        <Field
          name = 'questions'
          type = 'text'
          component = {renderField}
          input = {e}/>
        {
          e.answers.map((e, i) => (
            <div>
              <Field
                name='answers'
                typd='text'
                label = {i+1}
                input = {e}
                component ={renderField}
              />
            </div>
        ))}
      </FormGroup>
    ))}
  </div>
);
