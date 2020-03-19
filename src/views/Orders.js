import React, { Component } from 'react'
import Container from '../components/Container'

export default class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }
  }

  render() {
    return (
      <Container {...this.props}>
      </Container>
    )
  }
}
