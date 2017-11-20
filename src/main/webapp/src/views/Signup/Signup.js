import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import { Card } from '../../components/Card/Card';
import { FormInputs } from '../../components/FormInputs/FormInputs';
import Button from '../../elements/CustomButton/CustomButton';
import { signUp } from '../../actions/authentication-actions';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
    };
  }

  handleChanges(e) {
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleSubmit(e) {
    this.props.signUp(this.state);
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={10}>
              <Card
                color="#CAFEFB"
                title="Sign Up"
                content={
                  <form>
                    <FormInputs
                      ncols={['col-md-6', 'col-md-6']}
                      proprieties={[
                        {
                          label: 'First Name',
                          name: 'firstName',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'First Name',
                          value: this.state.firstName,
                          onChange: this.handleChanges.bind(this),
                        },
                        {
                          label: 'Last Name',
                          name: 'lastName',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Last Name',
                          value: this.state.lastName,
                          onChange: this.handleChanges.bind(this),
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={['col-md-12']}
                      proprieties={[
                        {
                          label: 'Email',
                          name: 'email',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Email',
                          value: this.state.email,
                          onChange: this.handleChanges.bind(this),
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={['col-md-12']}
                      proprieties={[
                        {
                          label: 'Password',
                          name: 'password',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Password',
                          value: this.state.password,
                          onChange: this.handleChanges.bind(this),
                        },
                      ]}
                    />

                    <FormInputs
                      ncols={['col-md-12']}
                      proprieties={[
                        {
                          label: 'Phone',
                          name: 'phone',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Phone',
                          value: this.state.phone,
                          onChange: this.handleChanges.bind(this),
                        },
                      ]}
                    />
                    <Button
                      color="#123456"
                      bsStyle="info"
                      pullRight
                      fill
                      type="submit"
                      onClick={this.handleSubmit.bind(this)}
                    >
                      Sign Up
                    </Button>
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

const mapStateToProps = (state, ownProps) => ({
  user: state.userReducer,
});

export default withRouter(connect(mapStateToProps, { signUp })(Signup));
