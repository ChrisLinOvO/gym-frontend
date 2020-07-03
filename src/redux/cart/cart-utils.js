export const addShopItemToCart = (cartItems, addItem, itemQuantity = 1) => {
  const existCartItem = cartItems.find(
    (cartItem) => cartItem.itemId === addItem.itemId
  );
  if (existCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.itemId === addItem.itemId
        ? { ...cartItem, quantity: cartItem.quantity + itemQuantity }
        : cartItem
    );
  }
  return [...cartItems, { ...addItem, quantity: itemQuantity }];
};

export const removeCartItem = (cartItems, itemId) => {
  return cartItems.filter((item) => item.itemId !== itemId);
};

export const unlikeCartItem = (cartFavoriteItems, item) => {
  delete cartFavoriteItems[item.itemId];
  return { ...cartFavoriteItems };
};

export const decreaseCheckoutItem = (cartItems, removeItem) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.itemId === removeItem.itemId
  );
  if (existingItem.quantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem.itemId !== removeItem.itemId
    );
  } else {
    return cartItems.map((cartItem) =>
      cartItem.itemId === removeItem.itemId
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};
