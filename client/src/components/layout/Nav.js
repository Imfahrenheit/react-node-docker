import { Menu, Container, Dropdown } from "semantic-ui-react";
import React, { Component } from 'react'
import {NavLink, Link} from 'react-router-dom'


 class Nav extends Component {
  render() {
    const {isLoggedIn,logOut,user}= this.props
    return <div>
        <Menu  inverted>
          <Container>
            <Menu.Item as={Link} to="/" header>
              Home
            </Menu.Item>
          </Container>

          <Menu.Item as={NavLink} to="/signup" floated="right" content="Sign Up" />

          {!isLoggedIn ? <Menu.Item as={NavLink} to="/login" floated="right" content="Log In" />:
            <Menu.Item>
            <Dropdown text={user?user.name:'Name'}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={logOut} text=" Log Out" />
            </Dropdown.Menu>
          </Dropdown> 
          </Menu.Item>}

        </Menu>
      </div>;
  }
}
export default Nav