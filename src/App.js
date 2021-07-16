import React, { useEffect, useState } from "react";
import { Router, Switch, Route,Redirect } from "react-router-dom";
import UserService from "./services/user.service";
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import './assets/css/sb-admin-2.min.css';
import './assets/css/Navbar.css';
import './assets/css/NetworkError.css'
import './assets/css/Product.css'
import "./App.css";



import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home";
import Profile from "./components/profile/Profile";
import BoardUser from "./components/BoardUser";

import Dashboard from "./components/Seller/Dashboard";
import Order from "./components/Seller/Order/Order";
import Product from "./components/Seller/Product";
import AddProduct from "./components/Seller/AddProduct";

import Cart from './components/cart/Cart'
import NetworkError from './components/layout/NetworkError'
import ProductPreview from "./components/product/ProductPreview";
import Checkout from "./components/checkout/Checkout";

import { history } from "./helpers/history";
import { useDispatch, useSelector } from "react-redux";
import { loggedin } from "./actions/auth";

axios.defaults.withCredentials = true;

const App = () => {

  const { user: currentUser } = useSelector((state) => state.auth);  
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const [showSellerBoard, setShowSellerBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);


  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  },[]);

  useEffect(()=>{
    dispatch(loggedin());

    if (currentUser) {
      setShowSellerBoard(currentUser.roles.includes("ROLE_SELLER"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  })

  return (
    <>
    {content==="Network Error"?(
      <NetworkError content={content}/>
      ):(
        <Router history={history}>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/product/:id" component={ProductPreview} />
            <Route path="/user" component={BoardUser} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            {showSellerBoard? (
              <>
              <Route exact path="/seller/order" component={Order} />
              <Route exact path="/seller/product" component={Product} />
              <Route exact path="/seller/product/add" component={AddProduct} />

              <Route exact path={[
                "/profile",
                "/profile/:status",
                "/profile/myprofile",
                "/profile/address",
                "/profile/password",
                "/profile/order",
                "/profile/wishlist"
                ]}>
                  <Redirect to='/seller' />
              </Route>
              </>
            ):(
              <>
            <Route path="/profile" component={Profile} />
            <Route exact path={[
              "/seller", 
              "/seller/order",
              "/seller/product",
              "/seller/product/add"
              ]}>
              <Redirect to='/' />
            </Route>
            </>
            )}
          </Switch>
        </Router>
      )}
    </>
  );
};

export default App;
