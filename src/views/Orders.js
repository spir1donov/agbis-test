import React, { Component } from 'react'
import { Card, H3, H5 } from '@blueprintjs/core'
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
      this.props.orders.map((order, index) => {
        const services = order.services.map((service, serviceIndex) => {
          const addons = service.addons.map((addon, addonIndex) => (<li key={addonIndex}>
            <b>
              {decodeURIComponent(addon.descr)}
            </b>:&nbsp;
            {decodeURIComponent(addon.aos_value)}
            <br/>
          </li>))
          return (<li key={serviceIndex}>
            <H5>{decodeURIComponent(service.service)}</H5>
            <b>Статус</b>: <span>
              {decodeURIComponent(service.status_name)}
            </span>
            &nbsp;&bull;&nbsp;
            <b>Группа</b>: <span>
              {decodeURIComponent(service.group_tov)}
            </span>
            <ul className='order-services-addons'>
              {addons}
            </ul>
          </li>)
        })
        return (
          <Card key={index}>
            <span className='float-right'>{decodeURIComponent(order.doc_date)}</span>
            <H3>{decodeURIComponent(order.sclad_name)}</H3>
            <p>{decodeURIComponent(order.sclad_adr)}</p>
            <ol className='order-services'>
              {services}
            </ol>
          </Card>
        )
      })
      : 'Загрузка заказов...'
    return (
      <Container {...this.props}>
        {orders}
      </Container>
    )
  }
}
