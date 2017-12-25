import React, { Component } from 'react'
import {
  Col,
  Table,
  PageHeader
} from 'react-bootstrap'
import docCookies from "../../helper/cookie";
import { connect } from 'react-redux'
import Card from 'components/Card/Card'

class TopScorers extends Component {

  constructor(props) {
    super(props)
    this.thArray = ['Name', 'Test', 'Date Taken', 'Mark']
    this.state = {
      TopScorers: []
    }
  }

  async componentDidMount() {
    // We don't need redux for this.
    // Reason: creating another reducer just to this play this page data is redundant, while no other part of application use it.
    // ref: https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367
    await this.getAllTopScore();
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  async getAllTopScore(pageNumber = 0) {
    const token = docCookies.getItem('token')

    const response = await fetch(`/api/results?page=${pageNumber}&size=10`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    await this.setStateAsync({TopScorers: data.content})
  }

  render() {
    return(
      <Col md={12}>
        <Card
          title="Top Scorers"
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
                this.state.TopScorers.map((prop, key) => (
                  <tr key={key}>
                    <td>{prop['firstName']} {prop['lastName']}</td>
                    <td>{prop['testName']}</td>
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
  };
}

export default connect(mapStateToProps, { })(TopScorers);

