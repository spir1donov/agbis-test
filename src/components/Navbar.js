import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {
  Alignment,
  Divider,
  Navbar
} from '@blueprintjs/core'

export default class NavigationBar extends Component {
  constructor (props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <Navbar className='bp3-dark'>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <b>
              Агбис
            </b>
          </Navbar.Heading>
          <Link className="bp3-button bp3-minimal" to="/">Заказы</Link>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT} className="hide-mobile">
          <Divider />
          <Link className="bp3-button bp3-minimal" to="/client">
            {this.props.clientData ? decodeURIComponent(this.props.clientData.short_name) : '...'}
          </Link>
          <Link className="bp3-button bp3-minimal" to="/logout">Выход</Link>
        </Navbar.Group>
      </Navbar>
    )
  }
}
