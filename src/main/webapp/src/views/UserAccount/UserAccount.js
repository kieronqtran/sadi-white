import React, { Component } from 'react'
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap'

import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Card } from 'components/Card/Card'
import { FormInputs } from 'components/FormInputs/FormInputs'
import { UserCard } from 'components/UserCard/UserCard'
import Button from 'elements/CustomButton/CustomButton'
import { signInAction, logOut } from '../../actions/authentication-actions'

import avatar from 'assets/img/faces/face-3.jpg'

class UserAccount extends Component {
  logOutAction(){
    this.props.logOut();
    this.props.history.push('/login')
  }

  getAllResult(){
      var rows = [];
      for (var i = 0; i < this.props.result.length; i++) {
          rows.push(
              <FormInputs
                  ncols={['col-md-4', 'col-md-4', 'col-md-4']}
                  proprieties={[
                      {
                          label: 'Test Name',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Test Name',
                          value: this.props.result[i].testName,
                      },
                      {
                          label: 'Correct Answers',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Last Name',
                          value: this.props.result[i].numberOfCorrectAnswer,
                      },
                      {
                          label: 'Total Questions',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Total Questions',
                          value: this.props.result[i].size,
                      }
                  ]}
              />
          );
      }
      return <form>{rows}</form>;
  }

  render(){
      return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={['col-md-6', 'col-md-6']}
                      proprieties={[
                        {
                          label: 'First Name',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'First Name',
                          value: this.props.logInUser.firstName,
                        },
                        {
                          label: 'Last Name',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Last Name',
                          value: this.props.logInUser.lastName,
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={['col-md-7', 'col-md-5']}
                      proprieties={[
                        {
                          label: 'Email address',
                          type: 'email',
                          bsClass: 'form-control',
                          placeholder: 'Email',
                          value: this.props.logInUser.email,
                        },
                        {
                          label: 'Phone',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Phone',
                          value: this.props.logInUser.phone,
                        },
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill type="submit"
                    onClick={this.logOutAction.bind(this)}>
                        Log Out
                    </Button>
                  </form>
                }
              />
              <Card
                title="Grade"
                content={this.getAllResult()}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}




function mapStateToProps(state) {
  return {
    logInUser: state.logInReducer,
      result: state.resultReducer
  }
}

export default withRouter(
  connect(mapStateToProps, { signInAction, logOut })(UserAccount),
)
