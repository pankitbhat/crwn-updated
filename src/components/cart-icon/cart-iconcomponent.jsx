import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selector";
import {
  CartContainer,
  ShoppingIcon,
  ItemCountConatiner
} from "./cart-icon.styles";

const cartIcon = ({ toggleCartHidden, itemCount }) => (
  <CartContainer onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <ItemCountConatiner>{itemCount}</ItemCountConatiner>
  </CartContainer>
);

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => {
    dispatch(toggleCartHidden());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(cartIcon);
