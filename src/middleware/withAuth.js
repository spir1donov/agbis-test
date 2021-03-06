import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { AppToaster } from '../components/Toaster'
import { Intent } from '@blueprintjs/core'

export default function withAuth (ComponentToProtect) {
  return class AuthWrapper extends Component {
    constructor(props) {
      super(props)

      this.state = {
        ...this.props,
        clientData: null,
        orders: [],
        loading: true,
        redirect: false,
        sessionId: ''
      }
    }

    componentDidMount() {
      this.handleCheckAuth()
    }

    handleCheckAuth = () => {
      const sessionId = this.getCookie('sessionId')
      if (!sessionId) {
        AppToaster.show({
          message: `Пожалуйста, авторизуйтесь`,
          intent: Intent.PRIMARY,
          icon: 'error'
        })
        this.setState({ loading: false, redirect: true })
      } else {
        this.setState({ loading: false, sessionId: sessionId }, this.handleClientDataLoad)
      }
    }

    getCookie (cookieName) {
      let name = cookieName + "="
      let decodedCookie = decodeURIComponent(document.cookie)
      let ca = decodedCookie.split(';')
      for(let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') {
          c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length)
        }
      }
      return null
    }

    handleOrdersLoad = () => {
      const errText = 'Ошибка загрузки заказов.'

      fetch('/cl/test/api/?Orders=' + JSON.stringify({
        sclad: 1,
        need_serv: 1
      }) + '&SessionID=' + this.state.sessionId)
        .then(res => res.json())
        .then(response => {
          const { error, ...rest } = response
          if (!error)
            this.setState({
              orders: rest.orders
            })
          else
            AppToaster.show({
              message: `${errText} ${JSON.stringify(rest)}`,
              intent: Intent.PRIMARY,
              icon: 'error'
            })
        })
        .catch(e => {
          AppToaster.show({
            message: `${errText} ${e}`,
            intent: Intent.PRIMARY,
            icon: 'error'
          })
        })
    }

    handleClientDataLoad = () => {
      const errText = 'Ошибка загрузки информации по клиенту.'

      fetch('/cl/test/api/?ContrInfo&SessionID=' + this.state.sessionId)
        .then(res => res.json())
        .then(response => {
          const { error, ...rest } = response
          if (!error)
            this.setState({
              clientData: rest
            })
          else
            AppToaster.show({
              message: `${errText} ${JSON.stringify(rest)}`,
              intent: Intent.PRIMARY,
              icon: 'error'
            })
        })
        .catch(e => {
          AppToaster.show({
            message: `${errText} ${e}`,
            intent: Intent.PRIMARY,
            icon: 'error'
          })
        })
    }

    render() {
      const { loading, redirect } = this.state
      if (loading) {
        return null
      }
      if (redirect) {
        return <Redirect to="/login" />
      }
      return <ComponentToProtect
        {...this.state}
        handleOrdersLoad={this.handleOrdersLoad.bind(this)}
        orders={this.state.orders}
        clientData={this.state.clientData}
      />
    }
  }
}
