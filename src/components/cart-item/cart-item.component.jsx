import React from "react";

import {
  CartItemContainer,
  ItemDetailsContainer,
  CartItemImage
} from "./cart-item.styles";

const cartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <CartItemContainer>
    <CartItemImage src={imageUrl} alt="item"></CartItemImage>
    <ItemDetailsContainer>
      <span>{name}</span>
      <span className="price">
        {quantity} * ${price}
      </span>
    </ItemDetailsContainer>
  </CartItemContainer>
);

export default cartItem;
