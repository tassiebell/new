import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Helper function to clean the cost (remove '$' and convert to number)
  const cleanCost = (cost) => {
    const numericCost = parseFloat(cost.replace(/[^0-9.-]+/g, "")); // Remove any non-numeric characters
    return isNaN(numericCost) ? 0 : numericCost;
  };

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => {
        const itemCost = cleanCost(item.cost);
        return total + item.quantity * itemCost;
      }, 0)
      .toFixed(2); // Format to two decimal places
  };

  const handleContinueShopping = () => {
    onContinueShopping(); // Call the parent function to continue shopping
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); // Remove item from the cart
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const itemCost = cleanCost(item.cost);
    return (item.quantity * itemCost).toFixed(2); // Format to two decimal places
  };

  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">
                ${cleanCost(item.cost).toFixed(2)} {/* Display cleaned cost */}
              </div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => onContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
