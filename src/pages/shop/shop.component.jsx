import React from "react";

import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import Collection from "../collection/collection.component";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions.js";
import {
  selectIsCollectionFetching,
  selectIsCollectionLoaded
} from "../../redux/shop/shop.selector.js";

const CollectionOverviewSpinner = WithSpinner(CollectionOverview);
const CollectionSpinner = WithSpinner(Collection);

class ShopPage extends React.Component {
  state = {
    loading: true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match, isCollectionFetching, isCollectionLoaded } = this.props;
    return (
      <div className="shop-page">
        {/*On clicking the Shop Link , this opens up the overview of the collection.*/}
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionOverviewSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />
        {/*On clicking the Homepage display , one goes to the respective category*/}
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionSpinner isLoading={!isCollectionLoaded} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionLoaded: selectIsCollectionLoaded
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPage);
