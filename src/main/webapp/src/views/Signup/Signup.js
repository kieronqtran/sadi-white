import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import { Card } from '../../components/Card/Card';
import { signUp } from '../../actions/authentication-actions';
import SignupForm from './components/SignupForm';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    this.props.signUp(e);
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row className={"sign-up-container"}>
            <Col md={4}>
              <Card
                title="Sign Up"
                content={<SignupForm onSubmit={this.handleSubmit.bind(this)}/>}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.userReducer,
});

export default withRouter(connect(mapStateToProps, { signUp })(Signup));
