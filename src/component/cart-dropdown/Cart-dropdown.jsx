import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { CSSTransition } from "react-transition-group";
// import { withRouter } from "react-router-dom";

import CartItem from "../cart-item/Cart-item";

import {
  cartItemsSelect,
  cartHiddenSelect,
  favoriteItemsSelect,
} from "../../redux/cart/cart-selector";

import "./cart-dropdown.scss";
import { taggleCartDropdown } from "../../redux/cart/cart-action";
import LikeIcon from "../like-icon/LikeIcon";
import CartIcon from "../cart-icon/Cart-icon";
import CustomButton from "../custom-button/Custom-button";
import { useHistory } from "react-router-dom";

const CartDropdown = ({
  cartItems,
  cartFavoriteItems,
  hidden,
  taggleCartDropdown,
}) => {
  const history = useHistory();
  const content = (
    <CSSTransition
      in={hidden}
      timeout={200}
      classNames="slide-in-right"
      mountOnEnter
      unmountOnExit
    >
      <div className="cart-dropdown" onMouseLeave={() => taggleCartDropdown()}>
        <div className="cart-icon-fav-container">
          <LikeIcon />
          <div style={{ width: "15px" }} />
          <CartIcon />
        </div>

        <h3>購物車 :</h3>
        <div className="cart-items-dropdown-container">
          {cartItems.length ? (
            <>
              {cartItems.map((cartItem) => (
                <CartItem key={cartItem.itemId} cartItem={cartItem} />
              ))}
            </>
          ) : (
            <span className="empty-message">快來選購心動的產品吧～</span>
          )}
        </div>

        <div className="under-line" />

        <h3>追蹤商品 :</h3>
        <div className="cart-items-dropdown-container">
          {Object.values(cartFavoriteItems).length ? (
            <>
              {Object.values(cartFavoriteItems).map((cartItem) => (
                <CartItem
                  key={cartItem.itemId}
                  cartItem={cartItem}
                  fav={true}
                />
              ))}
            </>
          ) : (
            <span className="empty-message">快來收藏我喔～</span>
          )}
        </div>
        <CustomButton onClick={() => history.push("/CartList")}>
          結帳
        </CustomButton>
      </div>
    </CSSTransition>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("side-dropdown")
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: cartItemsSelect,
  hidden: cartHiddenSelect,
  cartFavoriteItems: favoriteItemsSelect,
});

const mapDispatchToProps = (dispatch) => ({
  taggleCartDropdown: () => dispatch(taggleCartDropdown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
