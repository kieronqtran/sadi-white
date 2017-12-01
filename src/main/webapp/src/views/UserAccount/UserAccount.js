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
  render() {
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
                          value: this.props.user.firstName,
                        },
                        {
                          label: 'Last Name',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Last Name',
                          value: this.props.user.lastName,
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={['col-md-6', 'col-md-6']}
                      proprieties={[
                        {
                          label: 'Email address',
                          type: 'email',
                          bsClass: 'form-control',
                          placeholder: 'Email',
                          value: this.props.user.email,
                        },
                        {
                          label: 'Phone',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Phone',
                          value: this.props.user.phone,
                        },
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill type="submit"
                    onClick={this.logOutAction.bind(this)}>
                        Log Out
                    </Button>
                    <div className="clearfix"></div>
                  </form>
                }
              />
              <Card
                title="Grade"
                category="Your grade from the previous tests."
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
    user: state.user.userProfile,
  }
}

export default withRouter(connect(mapStateToProps, { logOut })(UserAccount))
