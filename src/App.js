import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SignInSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";
// import { selectCollectionsForPreview } from "./redux/shop/shop.selector";

class App extends React.Component {
  constructor() {
    console.log("in constructor");
    super();
    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    console.log("mount component  ");
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const { setCurrentUser } = this.props;
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        console.log(userRef);
        userRef.onSnapshot(snapShot => {
          console.log(snapShot.data());
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      } else {
        setCurrentUser(userAuth);
        // addCollectionAndDocuments(
        //   "collections",
        //   collectionsArray.map(({ title, items }) => ({
        //     title,
        //     items
        //   }))
        // );
      }
    });
  }

  componentWillUnmount() {
    console.log("componentWillUnmount App");
    this.unsubscribeFromAuth();
  }

  render() {
    console.log("App render Method");
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInSignUpPage />
              )
            }
          />
          <Route exact path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  // collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

//!       connect -> it is synced up to our store, listening to each change in the state that occurs
//TODO   When a change occurs , it calls a function mapStateToProps .
//!       in mapStateToProps() we specify exactly which slice of the state we want to provide to our component
//TODO    Then we have to say which component in our application we are providing this data to:
//!       you can see that we write connect(mapStateToProps)(App) to specify that we are connecting this state to the App component.

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
