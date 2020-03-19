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
        accounts: [],
        loading: true,
        redirect: false,
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
        this.setState({ loading: false })
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
      />
    }
  }
}
