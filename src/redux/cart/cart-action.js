import { cartActionTypes } from "./cart-action-type";

export const taggleCartDropdown = () => ({
  type: cartActionTypes.TAGGLE_CART_DROPDOWN,
});

export const addItemToCart = (item) => ({
  type: cartActionTypes.ADD_ITEM,
  payload: item,
});

export const removeItemFromCart = (itemId) => ({
  type: cartActionTypes.REOMOVE_ITEM,
  payload: itemId,
});

export const likeCartItem = (item) => ({
  type: cartActionTypes.LIKE_ITEM,
  payload: item,
});

export const unlikeCartItem = (item) => ({
  type: cartActionTypes.UNLIKE_ITEM,
  payload: item,
});

export const addQuantity = (item, quantity) => ({
  type: cartActionTypes.ADD_QUANTITY,
  payload: item,
  quantity,
});

export const cleanCheckout = (cartItem) => ({
  type: cartActionTypes.CHECKOUT_CLEAN,
  payload: cartItem,
});

export const decreaseCheckout = (cartItem) => ({
  type: cartActionTypes.CHECKOUT_DECREASE,
  payload: cartItem,
});
