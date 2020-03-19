import React, { Component } from 'react'
import {Icon} from '@blueprintjs/core'
import Navbar from './Navbar'

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false
    }
  }

  toggleMenu = () => {
    this.setState({showMenu: !this.state.showMenu})
  }

  render() {
    return (
      <div
        className={(this.state.showMenu ? 'shows-menu' : '') + ' flex-container-outer'}
      >
        <div className="flex-container">
          <div className="main-content">
            <header>
              <Navbar
                {...this.props}
              />
            </header>
            <main className="content">
              <article className='padded'>
                {this.props.children}
              </article>
            </main>
          </div>
        </div>
        <span
          onClick={this.toggleMenu}
          className='mobile-menu-toggle'
        >
          <Icon
            icon={this.state.showMenu ? 'cross' : 'menu'}
            iconSize={Icon.SIZE_LARGE}
          />
        </span>
      </div>
    );
  }
}
