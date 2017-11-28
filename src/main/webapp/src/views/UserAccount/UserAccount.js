import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';

import { Card } from 'components/Card/Card';
import { FormInputs } from 'components/FormInputs/FormInputs';
import { UserCard } from 'components/UserCard/UserCard';
import Button from 'elements/CustomButton/CustomButton';

import avatar from 'assets/img/faces/face-3.jpg';

class UserAccount extends Component {
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
                          value: this.props.firstname,
                        },
                        {
                          label: 'Last Name',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Last Name',
                          value: this.props.lastname,
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
                          value: this.props.email,
                        },
                        {
                          label: 'Phone',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Phone',
                          value: this.props.phone,
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={['col-md-7']}
                      proprieties={[
                        {
                          label: 'Password',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Password',
                          value: this.props.password,
                        },
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill type="submit">
                      Update Profile
                    </Button>
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
    );
  }
}

export default UserAccount;
