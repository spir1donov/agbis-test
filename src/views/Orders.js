import React, { Component } from 'react'
import { Button, Card, H5 } from '@blueprintjs/core'
import Container from '../components/Container'

export default class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }
  }

  componentDidMount () {
    this.props.handleOrdersLoad()
  }

  render() {
    const orders = this.props.orders.length > 0 ?
      this.props.orders.map((item, index) => (
        <Card key={index}>
          <H5>{decodeURIComponent(item.sclad_name)}</H5>
          <p>{decodeURIComponent(item.sclad_adr)}</p>
          <Button>O_o</Button>
        </Card>
      ))
      : 'Загрузка заказов...'
    return (
      <Container {...this.props}>
        {orders}
      </Container>
    )
  }
}
