import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Card } from 'components/Card/Card';
import { StatsCard } from 'components/StatsCard/StatsCard';
import { Tasks } from 'components/Tasks/Tasks';
import { FormInputs } from '../../components/FormInputs/FormInputs';
import { UserCard } from 'components/UserCard/UserCard';
import Button from 'elements/CustomButton/CustomButton';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';

import { Field, reduxForm, propTypes } from 'redux-form';

import { signInAction } from '../../actions/authentication-actions';
import ReactDOM from 'react-dom'
const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {
  let comRef;
  return (
  <Row>
    <div className={custom["ncols"]}>
      <FormGroup>
        <ControlLabel className="pull-left">{label}</ControlLabel>
        <FormControl {...input} {...custom} />
      </FormGroup>
    </div>
  </Row>
)};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChanges(e) {
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  submit = values => {
    // this.props.handleLogin(this.state);
    this.props.signInAction(values);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="content">
        <Grid fluid>
          <Row className="login-container">
            <Col md={4}>
                <Card
                  title="Login Profile"
                  content={
                    <form onSubmit={handleSubmit(this.submit.bind(this))}>
                      <Field
                        ncols = {["col-md-12"]}
                        name="email"
                        component={renderTextField}
                        label="Email"
                        bsClass="form-control"
                        placeholder="Email"
                      />
                      <Field
                        ncols={["col-md-12"]}
                        name="password"
                        component={renderTextField}
                        type="password"
                        label="Password"
                        placeholder="Password"
                        bsClass="form-control"
                        />
                      <Button
                        bsStyle="info"
                        pullRight
                        fill
                        type="submit"
                      >
                        Sign In
                      </Button>
                      <div className="clearfix"></div>
                    </form>
                  }
                  />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated,
  };
}

const reduxFormSignIn = reduxForm({
  form: 'login',
})(Login);

export default withRouter(
  connect(mapStateToProps, { signInAction })(reduxFormSignIn)
);
