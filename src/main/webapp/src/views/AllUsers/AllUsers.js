import React, { Component } from 'react'
import {
  Grid,
  Row,
  Col,
  Table,
  Button
} from 'react-bootstrap'

import { connect } from 'react-redux'
import Card from 'components/Card/Card'
import { deleteAccount, getAllAccount } from '../../actions/authentication-actions'

class AllUsers extends Component {
  constructor(props) {
    super(props)
    this.thArray = ['Email', 'First Name', 'Last Name', 'Phone']
    this.props.getAllAccount()
  }

  remove(id) {
    this.props.deleteAccount(id);
  }

  render() {
    const component = this;
    return(
      <Col md={12}>
      <Card
        title="All Accounts"
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
            {this.props.listAccount.map((prop, key) => (
              <tr key={key}>
                <td>{prop['email']}</td>
                <td>{prop['firstName']}</td>
                <td>{prop['lastName']}</td>
                <td>{prop['phone']}</td>
                <td>
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
    )
  }
}

function mapStateToProps(state) {
  return {
    listAccount: state.allAccount,
  };
}

export default connect(mapStateToProps, { deleteAccount, getAllAccount })(AllUsers);

