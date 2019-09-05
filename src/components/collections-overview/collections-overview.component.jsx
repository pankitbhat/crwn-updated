import React from "react";
import "./collections-overview.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectShopPreviewCollections } from "../../redux/shop/shop.selector";

import CollectionPreview from "../collection-preview/collection-preview.component";

const collectionsOverview = ({ collections }) => (
  <div className="collections-overview">
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectShopPreviewCollections
});

export default connect(mapStateToProps)(collectionsOverview);
