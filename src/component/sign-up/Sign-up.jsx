import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { createStructuredSelector } from "reselect";
import { userListSelect } from "../../redux/user/user-selector";
import FormInput from "../form-input/Form-input";
import CustomButton from "../custom-button/Custom-button";
import ErrorModel from "../error-model/ErrorModel";

import { userListStart, userLogin } from "../../redux/user/user-action";

import "./Sign-up.scss";

class SingUP extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
    mobile: "",
    unValid: false,
  };

  handleSubmit = async (e) => {
    const { history, userLogin } = this.props;
    e.preventDefault();
    const { data } = await axios.post(
      `http://localhost:5000/api/user/InsertUser`,
      {
        memberAccount: this.state.email,
        memberPwd: this.state.password,
        memberName: this.state.name,
        memberPhoneNum: this.state.mobile,
      }
    );
    if (data.success) {
      // userListStart();
      userLogin(data.currentUser);
      history.push("/");
    } else {
      this.setState({ unValid: true });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleIsValid = () => {
    this.setState({ unValid: false });
  };

  render() {
    return (
      <div className="sign-in">
        <h2 className="sign-up-title">會員註冊</h2>
        <span>輸入帳號&密碼&基本訊息註冊</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            label="Email"
            type="email"
          />

          <FormInput
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            label="Password"
            type="password"
          />
          <FormInput
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            label="name"
          />
          <FormInput
            name="mobile"
            value={this.state.mobile}
            onChange={this.handleChange}
            label="mobile"
          />
          <div className="buttons">
            <CustomButton type="submit">SIGN UP</CustomButton>
          </div>
        </form>
        {this.state.unValid && (
          <div className="unValid-backdrop" onClick={this.handleIsValid} />
        )}
        <ErrorModel
          unValid={this.state.unValid}
          handleIsValid={this.handleIsValid}
        >
          註冊資訊有誤，請重新輸入
        </ErrorModel>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userList: userListSelect,
});

const mapDispatchToProps = (dispatch) => ({
  userListStart: () => dispatch(userListStart()),
  userLogin: (user) => dispatch(userLogin(user)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingUP));
