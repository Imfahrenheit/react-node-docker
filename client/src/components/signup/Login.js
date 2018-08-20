import React, { Component } from "react";
import zxcvbn from "zxcvbn";
import {
  Input,
  Icon,
  Header,
  Segment,
  Button,
  Divider,
  Label
} from "semantic-ui-react";
import { connect } from "react-redux";
import * as allActions from "../../store/actions/actionCreators";
import { withRouter } from "react-router-dom";


const checkPassword = str => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(str);
};
const checkEmail = str => {
  const email = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return email.test(str);
};


class Login extends Component {
  state = {
    type: "password",
    score: "null",
    user: { email: "", password: "" },
    error: {}
  };



  static getDerivedStateFromProps(props, state) {
    if(props.history.location.pathname ==='/login')
    {props.authUser()}
    if (props.isLoggedIn) {
      props.history.push("/");
    }
    return null;
  }
   
  
  showHidePassword = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input"
    });
  };

  
  
  //a seperate change handler is used for password
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
  onInputChange = e => {
    const { user } = this.state;

    const name = e.target.name;
    user[name] = e.target.value;
    this.setState({ user, error: {} });
  };
  submit = () => {
    const { user } = this.state;
    const { initStoreUser, history } = this.props;
    const error = {};

    if (!checkPassword(user.password)) {
      error.password =
        " password should contain at least one number, one lowercase and one uppercase letter";

      this.setState({ error });
      return false;
    }
    if (!checkEmail(user.email)) {
      error.email = " please enter a valid email";

      this.setState({ error });
    } else {
      initStoreUser(user, history);
    }
  };

  render() {
    return (
      <Segment
        style={{
          textAlign:"center",
          display: "flex",
          flexDirection: "column",
          width: "50%",
          margin: "5% auto 0 auto"
        }}
      >
        <Header size="large">Log In</Header>
        <Input
          type="email"
          placeholder="email"
          name="email"
          onChange={this.onInputChange}
        />
        {this.state.error.email && (
          <Label basic color="red" size="small">
            {this.state.error.email}
          </Label>
        )}

        <Divider />

        <Input type={this.state.type} placeholder="password" size="small">
          <input onChange={this.passwordStrength} />
          <span onClick={this.showHidePassword} style={{ padding: "5px" }}>
            <Icon
              name="eye"
              color={this.state.type === "input" ? "red" : "blue"}
              size="large"
            />
          </span>
          <span className="password__strength" data-score={this.state.score} />
        </Input>
        {this.state.error.password && (
          <Label basic color="red" size="small">
            {this.state.error.password}
          </Label>
        )}
        <Divider />
        <Button content="Log in" onClick={this.submit} />
      </Segment>
    );
  }
}
const mapState = state => {
  return { isLoggedIn: state.MainReducer.isLoggedIn };
};

export default connect(
  mapState,
  allActions
)(withRouter(Login));
