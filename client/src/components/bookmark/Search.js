import React, { Component } from "react";
import { Input} from "semantic-ui-react";
import { debounce } from "lodash";
import Repo from './Repo'

export default class UploadInput extends Component {
  state = {
    search:""
  };
  componentWillUnmount() {
    this.debouncedEvent.cancel();
  }
  debounceEvent(...args) {
    this.debouncedEvent = debounce(...args);
    return e => {
      e.persist();
      return this.debouncedEvent(e);
    };
  }
  handleChange = e => {
    this.setState({ text: e.target.value });
    if(e.target.value!=="")this.props.searchRepo(e.target.value);
  };

displayRepos=()=>{
const {repos} = this.props;

return repos?repos.map(el=><Repo 
addBookmark={this.props.addBookmark}
key={el.id} item={el} />):<span/>

}

  render() {
    console.log(this.props.loader);
    return <div style={{ textAlign: "center", display: "flex", flexDirection: "column" }}>
       {this.props.loader && <div style={{ margin:'0 auto'}} className="lds-dual-ring" />}
        <Input onChange={this.debounceEvent(this.handleChange, 600)} icon="search" placeholder="Search repository...." />

        {this.displayRepos()}
      </div>;
  }
}
