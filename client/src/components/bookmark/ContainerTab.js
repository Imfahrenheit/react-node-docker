import React, { Component } from "react";
import { Tab, Segment } from "semantic-ui-react";
import Search from './Search'
import Bookmark from './Bookmark'

import { connect } from "react-redux";
import * as allActions from "../../store/actions/actionCreators";
import "../../css/upload.css";

class SignUp extends Component {
  panes = [
    {
      menuItem: " Search repository",
      render: () => (
        <Tab.Pane>
         <Search 
         repos={this.props.repos}
         searchRepo ={this.props.searchRepo}
         addBookmark={this.props.addBookmark}
         loader={this.props.loader}
         />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Bookmarked repositories",
      render: () => (
        <Tab.Pane>
          <Bookmark 
          fetchBookmarks={this.props.fetchBookmarks}
           bookmarks={this.props.bookmarks}
           delete={this.props.deleteFile}
           response={this.props.response}
          />
        </Tab.Pane>
      )
    }
  ];

  render() {
    return (
      <Segment style={{ margin: "5% auto 0 auto", width: "90%" }}>
        <Tab panes={this.panes} />
      </Segment>
    );
  }
}
const mapState = state => {
  return { 
    repos: state.MainReducer.repos, 
    response: state.MainReducer.response,
     bookmarks: state.MainReducer.bookmarks,
     loader:state.MainReducer.loader
    };
};

export default connect(
  mapState,
  allActions
)(SignUp);
