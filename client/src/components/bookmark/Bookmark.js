import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

class UploadInput extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchBookmarks();
  }

  displayBooksmarks = () => {
    const { bookmarks } = this.props;

    if (bookmarks && bookmarks[0])
      return bookmarks.map(item => (
        <div key={item._id} className="repo_card">
          <div
            style={{
              width: "50%",
              textAlign: "left",
              fontWeight: "bold"
            }}
          >
            {item.name}
          </div>

          <span
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <span style={{ cursor: "pointer", marginLeft: "13px" }}>
              <a href={item.repo_url} target="_blank">
                <Icon name="github" />
              </a>
            </span>

            <span style={{ cursor: "pointer", margin: " 0 13px 0 5px" }}
            onClick={()=>this.props.delete(item._id)}
            >
              <Icon name="trash" />
            </span>
          </span>
        </div>
      ));
  };

  render() {
  const { bookmarks } = this.props;
    
    return (
      <div style={{ textAlign:'center' }}>
    {this.displayBooksmarks()}
        {!bookmarks && <p > you have no bookmark </p> }
    </div>)
  }
}
export default UploadInput;
