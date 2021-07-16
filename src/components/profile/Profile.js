import React from "react";
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Navbar from '../layout/Navbar';
import MyProfile from "./MyProfile";
import Changepassword from "./Changepassword";
import Address from "./Address/Address";
import Order from "./Order/Order";
import Wishlist from "./Wish/Wish";

import { history } from "../../helpers/history";

import { Router, Switch, Route } from "react-router-dom";


import { loggedin } from "../../actions/auth";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  dispatch(loggedin());

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  //TODO need to update the user

  return (
    <>
    <Navbar state={true}/>
    <Router history={history}>             
          <Switch>
              <Route exact path="/profile/myprofile" component={MyProfile}/>
              <Route exact path="/profile/address" component={Address} />
              <Route exact path="/profile/password" component={Changepassword} />
              <Route exact path="/profile/order" component={Order} />
              <Route exact path="/profile/wishlist" component={Wishlist} />
          </Switch>
      </Router>
    </>
  );
};

export default Profile;
