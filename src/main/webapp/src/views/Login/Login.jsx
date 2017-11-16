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

class Login extends Component {
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

        const logIn = {
            email : '',
            password : ''
        }

        this.state = logIn;
    }

    handleChanges(e){
        var change = {}
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleSubmit(e){
        this.props.handleLogin(this.state);
    }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                    <Col md={10}>
                        <Card
                            color="#CAFEFB"
                            title="Login"
                            content={
                                <form>
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

                                    <Button
                                        color="#123456"
                                        bsStyle="info"
                                        pullRight
                                        fill
                                        type="submit"
                                        onClick={this.handleSubmit.bind(this)}
                                    >
                                        Log In
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

export default Login;
