import React, { Component,Fragment } from 'react'
import * as allActions  from '../../store/actions/actionCreators'
import ContainerTab from '../bookmark/ContainerTab'
import Landing from './landing.js'
import {connect } from 'react-redux'

 

 class Home extends Component {
      
  render() {
      const {isLoggedIn} = this.props
    return <Fragment>
       {!isLoggedIn &&  <Landing/> }
        {isLoggedIn&& <ContainerTab/>}

      

      </Fragment>
  }
}
const mapState = state => {
  return { isSignedUp: state.MainReducer.isSignedUp, isLoggedIn: state.MainReducer.isLoggedIn };
};

export default connect(mapState,allActions)(Home)