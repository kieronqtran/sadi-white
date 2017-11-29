import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Row } from 'react-bootstrap'
import { connect } from 'react-redux'

function FieldGroup({ label, ...props }) {
  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  )
}

export class FormInputs extends Component {
  render() {
    const row = []
    for (let i = 0; i < this.props.ncols.length; i++) {
      row.push(
        <div key={i} className={this.props.ncols[i]}>
          <FieldGroup {...this.props.proprieties[i]} />
        </div>,
      )
    }
    return <Row>{row}</Row>
  }
}

function mapStatetoProps(state) {
  return {
    authenticated: state.auth.authenticated,
  }
}

export default connect(mapStatetoProps)(FormInputs)
