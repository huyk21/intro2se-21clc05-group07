export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2); // 1.1 * 100 = 110, 110 / 100 = 1.1, 1.1.toFixed(2) = 1.10
};
export const updateCart = (state) => {
  //calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //calculate shipping price, if order is over $100 then free, else 10$
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  //calculate tax price
  state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));
  //calculate total price
  state.totalPrice = addDecimals(
    Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
  );
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
