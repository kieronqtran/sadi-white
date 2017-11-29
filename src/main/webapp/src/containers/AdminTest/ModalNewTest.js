import React from 'react';
import{Row, Col, Button, Modal, Tab, Nav, NavItem, FormGroup, FormControl, ControlLabel, InputGroup} from 'react-bootstrap';

const ModalNewTest = props => {
    const { save, close } =props

    // this.state.sizeValue
    //  onChange={this.handleChange.bind(this)}

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
                        <Col md={12}>
                            <label>Choose the time duration:{' '}
                                <input list="duration" name="testDuration" /> minute</label>
                            <datalist id="duration">
                                <option value="5"/>
                                <option value="10"/>
                                <option value="20"/>
                            </datalist>
                        </Col>
                        <Col md={12}>
                            <label>Choose the number of questions:{' '}
                                <input list="numQuestion" name="testSize" onChange={this.handleChange.bind(this)} /> questions</label>
                            <datalist id="numQuestion">
                                <option value="5"/>
                                <option value="10"/>
                                <option value="15"/>
                            </datalist>
                        </Col>

                        <Col sm={3}>
                            <Nav beStyle="pills" stacked>
                                {
                                    Array(this.state.sizeValue).fill(0).map((e, i) =>
                                        <NavItem eventKey={(i + 1).toString()}>Question {i+1} </NavItem>
                                    )
                                }
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content animation>
                                {
                                    Array(this.state.sizeValue).fill(0).map((e, i) =>
                                        <Tab.Pane eventKey={(i+1).toString()}>
                                            <FormGroup>
                                                <ControlLabel>Question</ControlLabel>
                                                <FormControl type='text' placeholder="Enter a Question." />
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
                                    )
                                }
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

export default ModalNewTest;