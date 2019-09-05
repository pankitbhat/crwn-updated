import React from "react";

import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_dpLCvBXbw1osThed0NfVHCss00kjU2yKds";

  const onToken = token => {
    console.log(token);
    alert("Successful payment");
  };

  return (
    <StripeCheckout
      token={onToken}
      stripeKey={publishableKey}
      label="Pay Now"
      panelLabel="Pay Now"
      name="Pankit Shipping Ltd."
      description={`Your total price is Rs.${price}`}
      amount={priceForStripe}
    />
  );
};

export default StripeCheckoutButton;
