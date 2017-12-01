import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import Card from 'components/Card/Card'
import { testTh } from 'variables/mockData.js';
import { connect } from 'react-redux';
import {getListTest} from '../../actions/test-actions.js'

class TestList extends Component {
  constructor(props){
    super(props);
    props.getListTest();
    console.log(this.props.testList.testList)
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
                          const testUrl = "#/takeTest/" + prop.id; // user this.props.history.push(`/takeTest/${prop.id}`) b/c we could ignore the # annoyinghash
// so that we could easily remove the hash. yep, not 100% sure but 80%
                          return (
                            <tr key={key}>
                              <td>{prop.id}</td>
                              <td>{prop.name}</td>
                              // <td>{prop.size}</td>
                              <td>{prop.testTime}</td>
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

function mapStateToProps(state, ownProps) {
  console.log(state)
  return {
    testList: state.test.testList, // the state params is the whole state of appliation so you need to access it through propertes assigned in the reducer
  };
}

export default connect(mapStateToProps, {getListTest})(TestList);
