import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SignupFormFirstPage from './SignupFormFirstPage'
import SignupFormSecondPage from './SignupFormSecondPage'
import SignupFormThirdPage from './SignupFormThirdPage'

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1,
    }
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const { onSubmit } = this.props
    const { page } = this.state
    return (
      <div>
        {page === 1 && <SignupFormFirstPage onSubmit={this.nextPage} />}
        {page === 2 && (
          <SignupFormSecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 3 && (
          <SignupFormThirdPage
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />
        )}
      </div>
    )
  }
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default SignupForm
