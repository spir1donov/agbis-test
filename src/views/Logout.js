import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Logout extends Component {
  componentDidMount() {
    document.cookie = "sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  }

  render() {
    return (
      <Redirect to="/login" />
    )
  }
}
