import React, { Component } from 'react'
import {
  Grid,
  Row,
  Col,
  Table,
  Button,
  Modal,
  OverlayTrigger,
  Tab,
  Nav,
  NavItem,
  FormGroup,
  Radio,
  FormControl,
  ControlLabel,
  InputGroup,
} from 'react-bootstrap'

import Card from 'components/Card/Card'
import { testData } from 'variables/mockData'
import CustomButton from '../../elements/CustomButton/CustomButton'
import FieldArrayForm from './components/fieldArrayForm'
import renderTestDetail from './components/editForm'

class AdminTest extends Component {
  constructor() {
    super()
    this.thArray = ['ID', 'Name', 'Size', 'Duration', 'Delete']

    this.state = {
      showModalNew: false,
      showModalEdit: false,
      questions: [
        {
          content: 'Hello?',
          answer: [
            { content: 'this is false', isCorrect: true },
            { content: 'this is true', isCorrect: false },
          ],
        },
        {
          content: 'How are you?',
          answer: [
            { content: 'this is false', isCorrect: true },
            { content: 'this is true', isCorrect: false },
          ],
        },
      ],
      testData: testData,
      sizeValue: 0,
    }
  }

  handleChange(event) {
    this.setState({ sizeValue: parseInt(event.target.value) })
  }

  onChange(event, question) {
    const index = this.state.testData[0].questions.findIndex(
      e => e.id === question.id,
    )
    this.state.testData[0].questions[index].content = event.target.value
    this.setState({ testData: this.state.testData })
  }

  openNew() {
    this.setState({ showModalNew: true, showModalEdit: false })
  }

  openEdit() {
    this.setState({ showModalNew: false, showModalEdit: true })
  }

  close() {
    this.setState({ showModalNew: false, showModalEdit: false })
	}

	remove() {
		this.state.testData
	}

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Create test"
                content={
                  <Button bsStyle="primary" onClick={this.openNew.bind(this)}>
                    New test
                  </Button>
                }
              />
            </Col>

            <Col md={12}>
              <Card
                title="Edit test"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {this.thArray.map((prop, key) => (
                          <th key={key}>{prop}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {testData.map((prop, key) => (
                        <tr key={key}>
                          <td>{prop['id']}</td>
                          <td>{prop['name']}</td>
                          <td>{prop['size']}</td>
                          <td>
                            {Math.floor(prop['duration'] / 1000) + ' second'}
                          </td>
                          <td>
                            <Button
                              bsStyle='danger'
                              onClick={this.remove.bind(this)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>

        <Modal
          show={this.state.showModalNew}
          dialogClassName="custom-modal"
          onHide={this.close.bind(this)}>
          <Modal.Header>
            <Modal.Title>
              Test form
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FieldArrayForm/>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.close.bind(this)}>
              Close
            </Button>
            <Button bsStyle="primary" onClick={this.close.bind(this)}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showModalEdit}
          dialogClassName="custom-modal"
          onHide={this.close.bind(this)}>
          <Modal.Header>
            <Modal.Title>
              Test form
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <renderTestDetail/>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.close.bind(this)}>
              Close
            </Button>
            <Button bsStyle="primary" onClick={this.close.bind(this)}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/*<Modal*/}
          {/*show={this.state.showModalNew}*/}
          {/*dialogClassName="custom-modal"*/}
          {/*onHide={this.close.bind(this)}*/}
        {/*>*/}
          {/*<Modal.Header>*/}
            {/*<Modal.Title>Test form</Modal.Title>*/}
          {/*</Modal.Header>*/}
          {/*<Modal.Body>*/}
            {/*<Tab.Container id="left-tabs" defaultActiveKey="1">*/}
              {/*<Row className="clearfix">*/}
                {/*<Col md={12}>*/}
                  {/*<label>*/}
                    {/*Choose the time duration:{' '}*/}
                    {/*<input list="duration" name="testDuration" /> minute*/}
                  {/*</label>*/}
                  {/*<datalist id="duration">*/}
                    {/*<option value="5" />*/}
                    {/*<option value="10" />*/}
                    {/*<option value="20" />*/}
                  {/*</datalist>*/}
                {/*</Col>*/}
                {/*<Col md={12}>*/}
                  {/*<label>*/}
                    {/*Choose the number of questions:{' '}*/}
                    {/*<input list="numQuestion" name="testSize" /> questions*/}
                  {/*</label>*/}
                  {/*<datalist id="numQuestion">*/}
                    {/*<option value="5" />*/}
                    {/*<option value="10" />*/}
                    {/*<option value="15" />*/}
                  {/*</datalist>*/}
                {/*</Col>*/}
                {/*<Col sm={3}>*/}
                  {/*<Nav bsStyle="pills" stacked>*/}
                    {/*{this.state.testData[0].questions.map((e, index) => (*/}
                      {/*<NavItem eventKey={(index + 1).toString()}>*/}
                        {/*Question{index + 1}*/}
                      {/*</NavItem>*/}
                    {/*))}*/}
                  {/*</Nav>*/}
                {/*</Col>*/}
                {/*<Col sm={9}>*/}
                  {/*<Tab.Content animation>*/}
                    {/*{this.state.testData[0].questions.map((e, i) => (*/}
                      {/*<Tab.Pane eventKey={(i + 1).toString()}>*/}
                        {/*<FormGroup>*/}
                          {/*<ControlLabel>Question</ControlLabel>*/}
                          {/*<FormControl*/}
                            {/*type="text"*/}
                            {/*value={e.content}*/}
                            {/*onChange={event => this.onChange(event, e)}*/}
                          {/*/>*/}
                        {/*</FormGroup>*/}
                      {/*</Tab.Pane>*/}
                    {/*))}*/}

                    {/*<Tab.Pane eventKey="1">*/}
                      {/*<FormGroup>*/}
                        {/*<ControlLabel>Question</ControlLabel>*/}
                        {/*<FormControl*/}
                          {/*type="text"*/}
                          {/*placeholder="Enter a Question."*/}
                        {/*/>*/}
                      {/*</FormGroup>*/}
                      {/*<FormGroup>*/}
                        {/*<ControlLabel>Choices</ControlLabel>*/}
                        {/*<InputGroup>*/}
                          {/*<InputGroup.Addon>0</InputGroup.Addon>*/}
                          {/*<FormControl type="text" />*/}
                        {/*</InputGroup>*/}
                      {/*</FormGroup>*/}
                      {/*<FormGroup>*/}
                        {/*<InputGroup>*/}
                          {/*<InputGroup.Addon>X</InputGroup.Addon>*/}
                          {/*<FormControl type="text" />*/}
                        {/*</InputGroup>*/}
                      {/*</FormGroup>*/}
                      {/*<FormGroup>*/}
                        {/*<InputGroup>*/}
                          {/*<InputGroup.Addon>X</InputGroup.Addon>*/}
                          {/*<FormControl type="text" />*/}
                        {/*</InputGroup>*/}
                      {/*</FormGroup>*/}
                      {/*<FormGroup>*/}
                        {/*<InputGroup>*/}
                          {/*<InputGroup.Addon>X</InputGroup.Addon>*/}
                          {/*<FormControl type="text" />*/}
                        {/*</InputGroup>*/}
                      {/*</FormGroup>*/}
                      {/*<FormGroup>*/}
                        {/*<InputGroup>*/}
                          {/*<InputGroup.Addon>X</InputGroup.Addon>*/}
                          {/*<FormControl type="text" />*/}
                        {/*</InputGroup>*/}
                      {/*</FormGroup>*/}
                    {/*</Tab.Pane>*/}
                    {/*<Tab.Pane eventKey="2">Tab 2 content</Tab.Pane>*/}
                    {/*<Tab.Pane eventKey="3">Tab 3 content</Tab.Pane>*/}
                    {/*<Tab.Pane eventKey="4">Tab 4 content</Tab.Pane>*/}
                    {/*<Tab.Pane eventKey="5">Tab 5 content</Tab.Pane>*/}
                  {/*</Tab.Content>*/}
                {/*</Col>*/}
              {/*</Row>*/}
            {/*</Tab.Container>*/}
          {/*</Modal.Body>*/}
          {/*<Modal.Footer>*/}
            {/*<Button bsStyle="danger" onClick={this.close.bind(this)}>*/}
              {/*Close*/}
            {/*</Button>*/}
            {/*<Button bsStyle="primary" onClick={this.close.bind(this)}>*/}
              {/*Save*/}
            {/*</Button>*/}
          {/*</Modal.Footer>*/}
        {/*</Modal>*/}
      </div>
    )
  }
}

export default AdminTest
