import React, { Component } from 'react'
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from 'react-bootstrap'

import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Card } from 'components/Card/Card'
import { FormInputs } from 'components/FormInputs/FormInputs'
import { UserCard } from 'components/UserCard/UserCard'
import Button from 'elements/CustomButton/CustomButton'
import { signInAction, logOut, updateInfo, getResult } from '../../actions/authentication-actions'
import UserProfile from './UserProfile'
import ResultList from './ResultList'


class UserAccount extends Component {

  constructor(props){
    super(props)
    this.props.getResult()
  }

  updateInfo(info){
    this.props.updateInfo(info);
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
                  <UserProfile onSubmit={this.updateInfo.bind(this)}
                               firstName={this.props.user.firstName}
                               lastName={this.props.user.lastName}
                               phone={this.props.user.phone}/>
                }
              />
              <div className="clearfix"></div>
              <Card
                title="Grade"
                content={<form>{
                  this.props.result.map(e => (
                    <ResultList testName={e.testName}
                                numberOfCorrectAnswer={e.numberOfCorrectAnswer}
                                size={e.size}/>
                  ))
                }</form>}
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
    result: state.result,
  }
}

export default withRouter(connect(mapStateToProps, { logOut, updateInfo, getResult })(UserAccount))
