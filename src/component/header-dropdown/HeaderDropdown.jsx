import React from "react";
import { Link, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  navChooseSelect,
  navLinkSelect,
} from "../../redux/nav-bar/navBar-selector";

import "./HeaderDropdown.scss";
import { shopShowFilterTag } from "../../redux/shop/shop-action";
import CustomButton from "../custom-button/Custom-button";
import { currentUserSelect } from "../../redux/user/user-selector";

const HeaderDropdown = ({
  setSubDiv,
  subDiv,
  navChoose,
  navLink,
  dispatch,
  currentUser,
}) => {
  const history = useHistory();
  return (
    <CSSTransition
      in={subDiv}
      timeout={200}
      classNames="slide-in-top"
      mountOnEnter
      unmountOnExit
    >
      <div className="sub-div" onMouseLeave={() => setSubDiv(false)}>
        <div className="top-sub-div">
          {navChoose.map((linkInfo) => (
            <Link
              key={linkInfo.name + "cc"}
              to={`${linkInfo.linkRoute}`}
              onClick={() => {
                dispatch(shopShowFilterTag("選擇篩選"));
                setSubDiv(false);
              }}
            >
              {linkInfo.name}
            </Link>
          ))}
        </div>

        <div className="side-sub-div">
          <h2 onClick={() => history.push("/shopping")}>商城專區</h2>
          <div className="side-sub-link-container">
            {navLink["shop"].map((linkInfo) => (
              <Link
                key={linkInfo.name + "h1"}
                to={`${linkInfo.linkRoute}`}
                onClick={() => {
                  dispatch(shopShowFilterTag("選擇篩選"));
                  setSubDiv(false);
                }}
              >
                {linkInfo.name}
              </Link>
            ))}
          </div>

          {currentUser ? (
            <>
              <span className="side-sub-user-title">
                嗨! {currentUser.memberName}
              </span>
              <CustomButton
                signin
                mobileMode
                onClick={() => {
                  setSubDiv(false);
                  history.push("/login");
                }}
              >
                登出
              </CustomButton>
            </>
          ) : (
            <CustomButton
              signin
              mobileMode
              onClick={() => {
                setSubDiv(false);
                history.push("/login");
              }}
            >
              登入
            </CustomButton>
          )}
        </div>
      </div>
    </CSSTransition>
  );
  // return ReactDOM.createPortal(
  //   content,
  //   document.getElementById("header-slide-dropdown")
  // );
};

const mapStateToProps = createStructuredSelector({
  navChoose: navChooseSelect,
  navLink: navLinkSelect,
  currentUser: currentUserSelect,
});

export default connect(mapStateToProps)(HeaderDropdown);
