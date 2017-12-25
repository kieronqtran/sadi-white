import React, { Component } from 'react'
import {
  Col,
  Table
} from 'react-bootstrap'

import { connect } from 'react-redux'
import Card from 'components/Card/Card'
import { deleteAccount, getAllResult } from '../../actions/authentication-actions'

class AllResults extends Component {
  constructor(props) {
    super(props)
    this.thArray = ['Test Name', 'First Name', 'Last Name', 'Correct', 'Total', 'Date Taken', 'Mark']
  }

  componentDidMount() {
    this.props.getAllResult()
  }

  render() {
    return(
      <Col md={12}>
        <Card
          title="All Results"
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
              {
                this.props.listResult.map((prop, key) => (
                <tr key={key}>
                  <td>{prop['testName']}</td>
                  <td>{prop['firstName']}</td>
                  <td>{prop['lastName']}</td>
                  <td>{prop['numberOfCorrectAnswer']}</td>
                  <td>{prop['size']}</td>
                  <td>{new Date(prop['createDate']).toLocaleDateString()}</td>
                  <td>{prop['numberOfCorrectAnswer'] / prop['size'] * 100} % </td>
                </tr>
                ))
              }
              </tbody>
            </Table>
          }
        />
      </Col>
    )
  }
}

function mapStateToProps(state) {
  return {
    listResult: state.allResult.data,
  };
}

export default connect(mapStateToProps, { deleteAccount, getAllResult })(AllResults);

