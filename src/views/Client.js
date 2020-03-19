import React, { Component } from 'react'
import { Card, H5 } from '@blueprintjs/core'
import Container from '../components/Container'

export default class Client extends Component {
  render() {
    const clientData = this.props.clientData ?
      (
        <Card>
          <H5>{decodeURIComponent(this.props.clientData.short_name)}</H5>
          <p>
            <b>Полное имя</b>:&nbsp;
            {decodeURIComponent(this.props.clientData.name)}
          </p>
          <p>
            <b>Телефон</b>:&nbsp;
            {decodeURIComponent(this.props.clientData.fone_cell)}
          </p>
          <p>
            <b>Email</b>:&nbsp;
            {decodeURIComponent(this.props.clientData.email)}
          </p>
          <p>
            <b>Адрес</b>:&nbsp;
            {decodeURIComponent(this.props.clientData.address)}
          </p>
        </Card>
      )
      : 'Загрузка данных клиента...'
    return (
      <Container {...this.props}>
        {clientData}
      </Container>
    )
  }
}
