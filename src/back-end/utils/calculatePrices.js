// This function rounds a given number to two decimal places
function addDecimals(number) {
    return (Math.round(number * 100) / 100).toFixed(3);
  }
  export function calculatePrices(orderItems) {
    const itemsPrice = orderItems.reduce(
      (acc, item) => acc + (item.price * 100 * item.qty) / 100,
      0
    );
  
    // Calculate the shipping price
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
  
    // Calculate the tax price
    const taxPrice = 0.15 * itemsPrice;
  
    // Calculate the total price
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
  
    return {
      itemsPrice: addDecimals(itemsPrice),
      shippingPrice: addDecimals(shippingPrice),
      taxPrice: addDecimals(taxPrice),
      totalPrice: addDecimals(totalPrice),
    };
  }
  