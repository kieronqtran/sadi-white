import React, { Component } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'

import Card from 'components/Card/Card'
import { testSample, testTh } from 'variables/mockData.js'

class TestList extends Component {
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
                      {testSample.map((prop, key) => {
                        const testUrl = '#/takeTest/' + prop.id
                        return (
                          <tr key={key}>
                            <td>{prop.id}</td>
                            <td>{prop.name}</td>
                            <td>{prop.size}</td>
                            <td>{prop.duration}</td>
                            <td>
                              <a href={testUrl}>Take this test</a>
                            </td>
                          </tr>
                        )
                      })}
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

export default TestList
