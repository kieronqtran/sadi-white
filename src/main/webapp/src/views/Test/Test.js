import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import { withRouter } from 'react-router';
import Card from 'components/Card/Card'
import { testSample, testTh } from 'variables/mockData.js';
import { connect } from 'react-redux';
import {getListTest} from '../../actions/test-actions.js'
import {
  GET_LIST_TEST,
  GET_LIST_TEST_ERROR
} from '../../actions/test-actions.js';

import { Link } from 'react-router-dom'


class TestList extends Component {
  constructor(props){
    super(props);
    this.props = props;
  }

  componentDidMount(){
    this.props.getListTest();
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
                  <Table className="table" striped hover>
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
                          const testUrl = "/takeTest/" + prop.id;
                          return (
                            <tr key={key}>
                              <td>{prop.id}</td>
                              <td>{prop.name}</td>
                              <td>{prop.size}</td>
                              <td>{Math.floor(prop['testTime'] / 60000) + ' minutes'}</td>
                              <td><Link to={testUrl}>Take this test</Link></td>
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

function mapStateToProps(state, ownProps){
  return {
    testList: state.test.testList
  };
}

export default connect(mapStateToProps, {
  getListTest
})(TestList);
