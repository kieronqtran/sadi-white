import React, { Component } from "react";
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
  InputGroup
} from "react-bootstrap";
import { connect } from "react-redux";
import { submit } from "redux-form";
import Card from "components/Card/Card";
import { testData } from "variables/mockData";
import CustomButton from "../../elements/CustomButton/CustomButton";
import FieldArrayForm from "./components/fieldArrayForm";
import {
  getTestById,
  postTest,
  putTest,
  deleteTest,
  getListTest
} from "../../actions/testing-restful";

const CreateTestModal = connect()(({ onSubmit, showModal, onClose, dispatch }) => (
  <Modal
    show={showModal}
    dialogClassName="custom-modal"
    onHide={onClose}

  >
    <Modal.Header closeButton>
      <Modal.Title>Create new tests</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <FieldArrayForm
        onClose={onClose}
      />
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onClose}>Close</Button>
      <Button bsStyle="primary" onClick={() => dispatch(submit('adminTestForm'))} >Create</Button>
    </Modal.Footer>
  </Modal>))

const UpdateTestModal = connect()(({ showModal, onClose, test, dispatch }) => {
  return (
  <Modal
    show={showModal}
    dialogClassName="custom-modal"
    onHide={onClose}
  >
    <Modal.Header closeButton>
      <Modal.Title>Update Test: {test.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <FieldArrayForm
        initialValues={test}
        onClose={onClose}
      />
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onClose}>Close</Button>
      <Button bsStyle="primary" onClick={() => dispatch(submit('adminTestForm'))}>Update</Button>
    </Modal.Footer>
  </Modal>);
})

const DeleteTestModal = ({ onSubmit, showModal, onClose, test }) => (<Modal
  show={showModal}
  onHide={onClose}
>
  <Modal.Header closeButton>
    <Modal.Title>Delete Test: {test.name}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Are you sure to delete this test?
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={onClose}>Close</Button>
    <Button bsStyle="primary" onClick={() => {onSubmit(test.id)}}>Delete</Button>
  </Modal.Footer>
</Modal>)

class TestManagement extends Component {
  constructor(props) {
    super(props);
    this.thArray = ["ID", "Name", "Size", "Duration", "Modify"];
    this.state = {
      showModalNew: false,
      showModalEdit: false,
      showModalDelete: false,
    }
  }

  componentDidMount() {
    this.props.getListTest();
  }

  handleChange(event) {
    this.setState({ sizeValue: parseInt(event.target.value) });
  }

  openNew() {
    this.setState({ showModalNew: true, showModalEdit: false, showModalDelete: false });
  }

  openEdit(testId) {
    this.props.getTestById(testId)
      .then(() => this.setState({ showModalNew: false, showModalEdit: true, showModalDelete: false }))
  }

  openDelete(testId) {
    const test = this.props.listTest.find(e => e.id === testId)
    this.setState({ showModalNew: false, showModalEdit: false, showModalDelete: true, deleteTestData: test })
  }

  close() {
    this.setState({ showModalNew: false, showModalEdit: false, showModalDelete: false, deleteTestData: null });
  }

  remove(testId) {
    this.props.deleteTest(testId);
  }

  render() {
    const component = this;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <div className='card' style={{marginTop: 10}}>
                <Row className='header'>
                  <Col md={6}> <h4 className="title">Test</h4> </Col>
                  <Col md={6}>
                    <Button
                    className="pull-right"
                    bsStyle="primary"
                    onClick={this.openNew.bind(this)}>
                      New test
                    </Button>
                  </Col>
                </Row>
                <div className={'content table-full-width table-responsive'}>
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
                          <td>{key + 1}</td>
                          <td>{prop["name"]}</td>
                          <td>{prop["size"]}</td>
                          <td>
                            {Math.floor(prop["testTime"] / 60000) + " minutes"}
                          </td>
                          <td>
                            <Button
                              key={key + "edit" + prop.id}
                              bsStyle="primary"
                              onClick={this.openEdit.bind(this, prop.id)}
                            >
                              Edit
                            </Button>{" "}
                            <Button
                              key={key + "delete"}
                              bsStyle="danger"
                              onClick={this.openDelete.bind(this,prop.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="footer">
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>

        <CreateTestModal showModal={this.state.showModalNew} onClose={this.close.bind(this)}/>

        {this.props.editTest && <UpdateTestModal showModal={this.state.showModalEdit} onClose={this.close.bind(this)} test={this.props.editTest}/>}

        {this.state.showModalDelete && <DeleteTestModal onSubmit={this.remove.bind(this)} showModal={this.state.showModalDelete} onClose={this.close.bind(this)} test={this.state.deleteTestData}/>}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    listTest: state.testManagement.listTest,
    editTest: state.testManagement.test,
    testLoaded: state.testManagement.loaded,
  };
}

export default connect(mapStateToProps, {
  getTestById,
  postTest,
  putTest,
  getListTest,
  deleteTest,
})(TestManagement);
