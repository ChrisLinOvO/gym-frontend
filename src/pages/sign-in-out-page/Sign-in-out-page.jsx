import React from "react";

import "./sign-in-out-page.scss";

import SignIn from "../../component/sign-in/Sign-in";
import SignUp from "../../component/sign-up/Sign-up";

const SignInOutPage = () => (
  <div className="sign-in-and-sign-out">
    <SignIn /> 
    <SignUp />
  </div>
);

export default SignInOutPage;
