import React, { Component } from 'react'
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap'

import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Card } from 'components/Card/Card'
import { FormInputs } from 'components/FormInputs/FormInputs'
import { UserCard } from 'components/UserCard/UserCard'
import { logOut, updateInfo, getResult } from '../../actions/authentication-actions'
import UserProfile from './UserProfile'
import ResultField from './ResultField'


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
                content={
                    this.props.result.map(e => (
                    <ResultField testName={e.testName}
                                 numberOfCorrectAnswer={e.numberOfCorrectAnswer}
                                 size={e.size}/>
                    ))
                }
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
    result: state.result.entities,
  }
}

export default withRouter(connect(mapStateToProps, { logOut, updateInfo, getResult })(UserAccount))
