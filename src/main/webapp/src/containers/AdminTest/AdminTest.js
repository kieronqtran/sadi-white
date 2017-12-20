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
import { connect } from 'react-redux'
import Card from 'components/Card/Card'
import { testData } from 'variables/mockData'
import CustomButton from '../../elements/CustomButton/CustomButton'
import FieldArrayForm from './components/fieldArrayForm'
import TestForm from './components/editForm'
import {postTest, putTest, deleteTest, getListTest} from '../../actions/testing-restful'

class AdminTest extends Component {
  constructor(props) {
    super(props)
    this.thArray = ['ID', 'Name', 'Size', 'Duration', 'Modify']
		props.getListTest();
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

    this.handleSaveSubmit = this.handleSaveSubmit.bind(this);
    this.handlePutSubmit = this.handlePutSubmit.bind(this);
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

	remove(testId) {
		this.props.deleteTest(testId);
	}

	postTest(test) {
  }

  handleSaveSubmit(value) {
    this.props.postTest(value)
  }

  handlePutSubmit(value) {
    this.props.putTest(value)
  }

  render() {
		const component = this;
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
                      {this.props.listTest.map((prop, key) => (
                        <tr key={key}>
                          <td>{prop['id']}</td>
                          <td>{prop['name']}</td>
                          <td>{prop['size']}</td>
                          <td>
                            {Math.floor(prop['testTime'] / 60000) + ' minutes'}
                          </td>
                          <td>
                            <Button
                              bsStyle='primary'
                              onClick={this.openEdit.bind(this)}
                            >
                              Edit
                            </Button>{' '}
                            <Button
                              bsStyle='danger'
															onClick={ event => component.remove(prop['id']) }
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
            <FieldArrayForm onSubmit={component.handleSaveSubmit} onClose={this.close.bind(this)}/>
          </Modal.Body>
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
            <TestForm onSubmit={component.handlePutSubmit} onClose={this.close.bind(this)}/>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    listTest: state.makeTest.listTest,
    currentTest: state.makeTest.currentQuestion,
  };
}

export default connect(mapStateToProps, {postTest, putTest, getListTest, deleteTest})(AdminTest);
