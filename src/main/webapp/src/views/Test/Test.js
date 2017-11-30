import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import { withRouter } from 'react-router';
import Card from 'components/Card/Card'
import { testSample, testTh } from 'variables/mockData.js';
import { connect } from 'react-redux';
import {getListTest} from '../../actions/test-actions.js'
import {
  GET_LIST_TEST,
  GET_LIST_TEST_ERROR,
} from '../../actions/test-actions.js';


class TestList extends Component {
  constructor(props){
    super(props);
    console.log("hello");
    this.props.getListTest();
    getListTest();
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="List of Test"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table class="table" striped hover>
                    <thead>
                      <tr>
                        {testTh.map((prop, key) => {
                          return <th key={key}>{prop}</th>
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.props.testList.map((prop, key) => {
                          const testUrl = "#/takeTest/" + prop.id;
                          return (
                            <tr key={key}>
                              <td>{prop.id}</td>
                              <td>{prop.name}</td>
                              <td>{prop.size}</td>
                              <td>{prop.duration}</td>
                              <td><a href={testUrl}>Take this test</a></td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state,ownProps){
  console.log(state)
  return {
    testList: state.testList,
  };
}

export default connect(mapStateToProps, {getListTest})(TestList);
