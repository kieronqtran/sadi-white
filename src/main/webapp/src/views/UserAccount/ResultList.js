import React, { Component }  from 'react'

import { FormInputs } from "../../components/FormInputs/FormInputs";


export class ResultList extends Component {
  render() {
    return (
      <FormInputs
        ncols={['col-md-6', 'col-md-2', 'col-md-2','col-md-2']}
        proprieties={[
          {
            label: 'Test Name',
            type: 'text',
            bsClass: 'form-control',
            placeholder: 'Test Name',
            value: this.props.testName
          },
          {
            label: 'Correct Answers',
            type: 'text',
            bsClass: 'form-control',
            placeholder: 'Last Name',
            value: this.props.numberOfCorrectAnswer
          },
          {
            label: 'Total Questions',
            type: 'text',
            bsClass: 'form-control',
            placeholder: 'Total Questions',
            value: this.props.size
          },
          {
            label: 'Mark',
            type: 'text',
            bsClass: 'form-control',
            placeholder: 'Mark',
            value: (this.props.numberOfCorrectAnswer/this.props.size)*100 + "%"
          }
        ]}
      />
    )
  }
}

export default ResultList
