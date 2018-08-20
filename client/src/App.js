import React, { Component } from "react";
import Nav from './components/layout/Nav'
import Home from './components/layout/Home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {connect} from 'react-redux'
import {Container} from 'semantic-ui-react'
import SignUp from "./components/signup/SignUp";
import Login from "./components/signup/Login";
import * as allActions from  './store/actions/actionCreators'

class App extends Component {
  state={}
  componentDidMount(){
    this.props.authUser()
  }

  render() {
    const { isLoggedIn ,logOut,user} = this.props;
    return (
      <Router>
        <div className="App">
          <Nav isLoggedIn={isLoggedIn} user={user} logOut={logOut} />
          <Container>
            <Switch>
              <Route exact path="/" render={() => <Home />} />
            </Switch>
            <Route exact path="/signup" render={() => <SignUp />} />
            <Route exact path="/login" render={() => <Login />} />
          </Container>
        </div>
      </Router>
    );
  }
}
const mapState= (state)=>{
  return {
  isLoggedIn:state.MainReducer.isLoggedIn,
  user:state.MainReducer.user
  }
}
export default connect(mapState,allActions)(App);
