import React from 'react';
import{Row, Col, Table, Button, Modal, OverlayTrigger, Tab, Nav, NavItem, FormGroup, Radio, FormControl, ControlLabel, InputGroup} from 'react-bootstrap';
import { testData } from 'variables/mockData';

const ModalNewTest = props => {
    const { save, close } =props
    return (
        <Modal>
            <Modal.Header>
                <Modal.Title>
                    Test form
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Tab.Container id="left-tabs" defaultActivityKey='first'>
                    <Row className="clearfix">

                        <Col sm={3}>
                            <Nav beStyle="pills" stacked>
                                {
                                    this.state.testData[0].questions.map((e, index) => (<NavItem eventKey={(index+1).toString()}>Question{index+1}</NavItem>))
                                }
                            </Nav>
                        </Col>

                        <Col md={9}>
                            <Tab.Content animation>
                                <Tab.Pane eventKey="first">
                                    <FormGroup>
                                        <ControlLabel>Question</ControlLabel>
                                        <FormControl type="text" placeholder="Enter a Question."/>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Choices</ControlLabel>
                                        <InputGroup>
                                            <InputGroup.Addon>0</InputGroup.Addon>
                                            <FormControl type="text" />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroup.Addon>X</InputGroup.Addon>
                                            <FormControl type="text" />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroup.Addon>X</InputGroup.Addon>
                                            <FormControl type="text" />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroup.Addon>X</InputGroup.Addon>
                                            <FormControl type="text" />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroup.Addon>X</InputGroup.Addon>
                                            <FormControl type="text" />
                                        </InputGroup>
                                    </FormGroup>
                                </Tab.Pane>

                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Modal.Body>

            <Modal.footer>
                <Button bsStyle="danger" onClick={close}>
                    Close
                </Button>
                <Button bsStyle="primary" onClick={save}>
                    Save
                </Button>
            </Modal.footer>
        </Modal>
    )
}

export default ModalEditTest;