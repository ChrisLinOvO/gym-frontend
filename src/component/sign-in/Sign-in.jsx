import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./sign-in.scss";

import FormInput from "../form-input/Form-input";
import CustomButton from "../custom-button/Custom-button";
import { userLogin } from "../../redux/user/user-action";
import { createStructuredSelector } from "reselect";
import { userListSelect } from "../../redux/user/user-selector";
import ErrorModel from "../error-model/ErrorModel";

class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    unValid: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { userList, userLogin, history } = this.props;

    const currentUser = userList.find(
      (user) => user.memberAccount === email && user.memberPwd === password
    );
    if (currentUser) {
      userLogin(currentUser);
      history.push("/");
    } else {
      console.log(this.state.unValid);
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
        <h2 className="sign-in-title">會員登入</h2>
        <span>輸入帳號 & 密碼登入</span>
        <form>
          <FormInput
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            label="Email"
            type="email"
            required
          />

          <FormInput
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            label="Password"
            type="password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit" onClick={this.handleSubmit}>
              登入
            </CustomButton>
          </div>
        </form>
        {this.state.unValid && (
          <div className="unValid-backdrop" onClick={this.handleIsValid} />
        )}
        <ErrorModel
          unValid={this.state.unValid}
          handleIsValid={this.handleIsValid}
        >
          帳號或密碼錯誤
        </ErrorModel>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userList: userListSelect,
});

const mapDispatchToProps = (dispatch) => ({
  userLogin: (user) => dispatch(userLogin(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
