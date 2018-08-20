import React from 'react'
import { Segment,Header,Button } from "semantic-ui-react";
import {Link } from 'react-router-dom'
const landing = () => {
  return <div>
      <Segment style={{ textAlign: "center", marginTop: "50px" }}>
        <Header>Please LogIn or SignUp to search a github repository </Header> 
          <div style={{ textAlign: "center", margin: "10px auto 0 auto" , width:'50%'}}>
          <Button as={Link} to="/login" content="Log In"/>  <Button as={Link} to="/signup" content="Sign up" />
        </div>
      </Segment>
    </div>;
}

export default landing
