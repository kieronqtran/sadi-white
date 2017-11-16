import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import {Card} from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {UserCard} from 'components/UserCard/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

import avatar from "assets/img/faces/face-3.jpg";

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
                                            ncols = {["col-md-6", "col-md-6"]}
                                            proprieties = {[
                                                {
                                                    label : "First Name",
                                                    type : "text",
                                                    bsClass : "form-control",
                                                    placeholder : "First Name"
                                                },
                                                {
                                                    label : "Last Name",
                                                    type : "text",
                                                    bsClass : "form-control",
                                                    placeholder : "Last Name"
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols = {["col-md-7" , "col-md-5"]}
                                            proprieties = {[
                                                {
                                                 label : "Email address",
                                                 type : "email",
                                                 bsClass : "form-control",
                                                 placeholder : "Email"
                                                },
                                                {
                                                 label : "Phone",
                                                 type : "text",
                                                 bsClass : "form-control",
                                                 placeholder : "Phone"
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols = {["col-md-7"]}
                                            proprieties = {[
                                                {
                                                    label : "Password",
                                                    type : "text",
                                                    bsClass : "form-control",
                                                    placeholder : "Password"
                                                }
                                            ]}
                                        />
                                        <Button
                                            bsStyle="info"
                                            pullRight
                                            fill
                                            type="submit"
                                        >
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
