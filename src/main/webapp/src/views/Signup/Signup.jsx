import React, { Component } from 'react';

import {Card} from 'components/Card/Card.jsx';
import {StatsCard} from 'components/StatsCard/StatsCard.jsx';
import {Tasks} from 'components/Tasks/Tasks.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {UserCard} from 'components/UserCard/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

class Signup extends Component {
    createLegend(json){
        var legend = [];
        for(var i = 0; i < json["names"].length; i++){
            var type = "fa fa-circle text-"+json["types"][i];
            legend.push(
                <i className={type} key={i}></i>
            );
            legend.push(" ");
            legend.push(
                json["names"][i]
            );
        }
        return legend;
    }

    constructor(props){
        super(props);

        const signup = {
            firstName : '',
            lastName : '',
            email : '',
            password : '',
            phone: ''
        }

        this.state = signup;
    }

    handleChanges(e){
        var change = {}
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleSubmit(e){
        this.props.handleSignup(this.state);
    }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={10} >
                            <Card
                                color="#CAFEFB"
                                title="Sign Up"
                                content={
                                    <form >
                                        <FormInputs
                                            ncols = {["col-md-6","col-md-6"]}
                                            proprieties = {[
                                                {
                                                    label : "First Name",
                                                    name : "firstName",
                                                    type : "text",
                                                    bsClass : "form-control",
                                                    placeholder : "First Name",
                                                    value : this.state.firstName,
                                                    onChange : this.handleChanges.bind(this)
                                                },
                                                {
                                                    label : "Last Name",
                                                    name : 'lastName',
                                                    type : "text",
                                                    bsClass : "form-control",
                                                    placeholder : "Last Name",
                                                    value : this.state.lastName,
                                                    onChange : this.handleChanges.bind(this)
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols = {["col-md-12"]}
                                            proprieties = {[
                                                {
                                                    label : "Email",
                                                    name : "email",
                                                    type : "text",
                                                    bsClass : "form-control",
                                                    placeholder : "Email",
                                                    value : this.state.email,
                                                    onChange : this.handleChanges.bind(this)
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols = {["col-md-12" ]}
                                            proprieties = {[

                                                {
                                                    label : "Password",
                                                    name : "password",
                                                    type : "text",
                                                    bsClass : "form-control",
                                                    placeholder : "Password",
                                                    value : this.state.password,
                                                    onChange : this.handleChanges.bind(this)
                                                }
                                            ]}
                                        />

                                        <FormInputs
                                            ncols = {["col-md-12" ]}
                                            proprieties = {[

                                                {
                                                    label : "Phone",
                                                    name : "phone",
                                                    type : "text",
                                                    bsClass : "form-control",
                                                    placeholder : "Phone",
                                                    value : this.state.phone,
                                                    onChange : this.handleChanges.bind(this)
                                                }
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

export default Signup;
