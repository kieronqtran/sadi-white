import React, { Component } from 'react';
import { Grid, Row, Col, Alert } from 'react-bootstrap';
import Button from 'elements/CustomButton/CustomButton.jsx';
import Card from 'components/Card/Card.jsx'


class Test extends Component {
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="**Test Time**"
                                category="**Total Mark**"
                                content={
                                    <div>
                                        <div>
                                            <h1><b>Test Name</b></h1>
                                            <div className="place-buttons">
                                                <Col md={10} mdOffset={1}>
                                                    <Button bsStyle="Success" block>Start</Button>
                                                </Col>
                                            </div>
                                        </div>

                                        <div className="typo-line">
                                            <h2>Question 1</h2>
                                            <div className="places-buttons">
                                                <Row>
                                                    <Col md={11} className="text-center">
                                                        <Button bsStyle="default" block>Answer 1</Button>
                                                    </Col>
                                                    <Col md={11} className="text-center">
                                                        <Button bsStyle="info" block>Answer 2</Button>
                                                    </Col>
                                                    <Col md={11} className="text-center">
                                                        <Button bsStyle="default" block>Answer 3</Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>

                                        <div className="typo-line">
                                            <h2>Question 2</h2>
                                            <div className="places-buttons">
                                                <Row>
                                                    <Col md={11} className="text-center">
                                                        <Button bsStyle="default" block>Answer 1</Button>
                                                    </Col>
                                                    <Col md={11} className="text-center">
                                                        <Button bsStyle="default" block>Answer 2</Button>
                                                    </Col>
                                                    <Col md={11} className="text-center">
                                                        <Button bsStyle="info" block>Answer 3</Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>

                                        <div className="typo-line">
                                            <h2>Question 3</h2>
                                            <div className="places-buttons">
                                                <Row>
                                                    <Col md={11} className="text-center">
                                                        <Button bsStyle="info" block>Answer 1</Button>
                                                    </Col>
                                                    <Col md={11} className="text-center">
                                                        <Button bsStyle="default" block>Answer 2</Button>
                                                    </Col>
                                                    <Col md={11} className="text-center">
                                                        <Button bsStyle="default" block>Answer 3</Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>

                                        <div className="place-buttons">
                                            <Row>
                                                <Col md={4} mdPush={8}>
                                                    <Button bsStyle="Success" block fill>Submit</Button>
                                                </Col>

                                            </Row>
                                        </div>

                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Test;

//
/*
                                        <div>
                                            <h1><b>List of Test</b></h1>
                                        </div>
                                        <div className="places-buttons">
                                            <Row>
                                                <Col md={10}>
                                                    <Button bsStyle="default" block>
                                                        <h3>Test Name</h3>
                                                        <h5>Author: </h5>
                                                        <h5>Time: </h5>
                                                        <p>Test description</p>
                                                    </Button>
                                                </Col>
                                                <Col md={10}>
                                                    <Button bsStyle="default" block>
                                                        <h3>Test Name</h3>
                                                        <h5>Author: </h5>
                                                        <h5>Time: </h5>
                                                        <p>Test description</p>
                                                    </Button>
                                                </Col>

                                                <Col md={10}>
                                                    <Button bsStyle="default" block>
                                                        <h3>Test Name</h3>
                                                        <h5>Author: </h5>
                                                        <h5>Time: </h5>
                                                        <p>Test description</p>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>


*/

