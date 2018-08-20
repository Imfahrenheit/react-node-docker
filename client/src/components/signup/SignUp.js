import React, { Component } from 'react'
import zxcvbn  from "zxcvbn"; 
//package for checking password strength
import { Input,Icon , Header,Segment,Button,Divider,Label} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as allActions from "../../store/actions/actionCreators";

const checkPassword = str => {
  const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  return pass.test(str);
};
const checkEmail = str => {
  const email = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  return email.test(str);
};

class SignUpForm extends Component {
  state = {
    type: "password",
    score: "null",
    user: {
      name: "",
      email: "",
      password: ""
    },
    error: {}
  };
  showHidePwd = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input"
    });
  };
  
  passwordStrength = e => {
    if (e.target.value === "") {
      this.setState({ score: "null" });
    } else {
      const pw = zxcvbn(e.target.value);
      const { user } = this.state;
      user.password = pw.password;

      this.setState({ score: pw.score, user, error: {} });
    }
  };
  submit = () => {
    const { user } = this.state;
    const { history,initUserSignUp } = this.props;
    let error = {};
    if ( user.name === "") {
    
      error["name"] = "field cannot be left empty";

      this.setState({ error });
      return false;
    }
    if (!checkPassword(user.password)) {
      
      error.password =
        " password should contain at least one number, one lowercase and one uppercase letter";

      this.setState({ error });
      return false;
    }
    if(!checkEmail(user.email)){
       const error = {};
       error.email = " please enter a valid email";

       this.setState({ error });
       return false;
    }
     
      initUserSignUp(user, history);
    
  };
  onInputChange = e => {
    const { user } = this.state;

    const name = e.target.name;
    user[name] = e.target.value;
    this.setState({ user, error: {} });
  };

  render() {
    return <Segment style={{ textAlign: "center", display: "flex", flexDirection: "column", width: "50%", margin: "5% auto 0 auto" }}>
        <Header size="huge">Sign Up </Header>
        <Input value={this.state.user.name} type="text" placeholder="name" name="name" onChange={this.onInputChange} />
        {this.state.error.name && <Label basic color="red" size="small">
            {this.state.error.name}
          </Label>}

        <Divider />
        <Input value={this.state.user.email} type="email" placeholder="email" name="email" onChange={this.onInputChange} />
        {this.state.error.email && <Label basic color="red" size="small">
            {this.state.error.email}
          </Label>}

        <Divider />

        <Input type={this.state.type} placeholder="password" size="small">
          <input onChange={this.passwordStrength} />
          <span onClick={this.showHidePwd} style={{ padding: "5px" }}>
            <Icon name="eye" color={this.state.type === "input" ? "red" : "blue"} size="large" />
          </span>
          <span className="password__strength" data-score={this.state.score} />
        </Input>
        {this.state.error.password && <Label basic color="red" size="small">
            {this.state.error.password}
          </Label>}
        <Divider />
        <Button content="Sign up" onClick={this.submit} />
      </Segment>;
  }
}
const mapState = state => {
  return { isLoggedIn: state.MainReducer.isLoggedIn };
};

export default connect(mapState,allActions)(withRouter(SignUpForm))