import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartItems } from "../../redux/cart/cart.selector";
import { selectCartTotalCost } from "../../redux/cart/cart.selector";

import CheckoutItem from "../../components/checkout-item/checkout=item.component";
import StripeCheckoutButton from "../../pages/checkout/checkout.component";

import "./checkout.styles.scss";

const CheckoutPage = ({ cartItems, total }) => {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="total">TOTAL: ${total}</div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotalCost
});

export default connect(mapStateToProps)(CheckoutPage);
