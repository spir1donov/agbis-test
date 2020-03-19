import React, { Component } from 'react'
import {
  Button,
  Card,
  Colors,
  Elevation,
  FormGroup,
  H2,
  InputGroup,
  Intent
} from '@blueprintjs/core'
import { AppToaster } from '../components/Toaster'
const sha1 = require('sha1')

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login : '+79000000001',
      password: '621126'
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target
    this.setState({
      [name]: value
    })
  }

  onSubmit = event => {
    event.preventDefault()
    fetch('/cl/test/api/?ModernLogin=' + JSON.stringify({
      phone: this.state.login,
      pwd: sha1(this.state.password)
    }))
      .then(res => res.json())
      .then(res => {
        console.log('res', res)
        if (!res.error && res.Session_id) {
          console.log(`Got session id`, res.Session_id)
          document.cookie = `sessionId=${res.Session_id}`
          this.props.history.push('/')
        } else {
          AppToaster.show({
            message: `Не удается авторизоваться. Пожалуйста, проверьте правильность данных`,
            intent: Intent.WARNING,
            icon: 'error'
          })
        }
      })
      .catch(err => {
        console.error(err);
        AppToaster.show({
          message: `Ошибка сети`,
          intent: Intent.WARNING,
          icon: 'error'
        })
      })
  }

  render() {
    return (
      <div className="container-fluid" style={{ background: Colors.DARK_GRAY2 }}>
        <div className="row middle-xs full-height">
          <div className="col-xs-offset-1 col-xs-10 col-md-offset-4 col-md-4">
            <Card elevation={Elevation.TWO}>
              <H2 className="bp3-heading">Авторизация</H2>
              <FormGroup
                label="Логин"
                labelFor="login"
              >
                <InputGroup
                  id="login"
                  name="login"
                  placeholder="Enter login"
                  value={this.state.login}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup
                label="Пароль"
                labelFor="password"
              >
                <InputGroup
                  id="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <Button
                onClick={this.onSubmit}
              >
                Вход
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
