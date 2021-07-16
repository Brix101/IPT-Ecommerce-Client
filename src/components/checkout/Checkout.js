import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutList from './CheckoutList';
import MiniNavbar from '../layout/MiniNavbar';

import { loggedin } from "../../actions/auth";
import { getChecked } from "../../actions/cart";


function Checkout() {

    const { user: currentUser } = useSelector((state) => state.auth);
    const { count } = useSelector((state) => state.cart);
    const { cartItem } = useSelector((state) => state.cart);
    const { sum } = useSelector((state) => state.cart);
  
    const dispatch = useDispatch();
  
    dispatch(loggedin());

    
  useEffect(() => {
    dispatch(getChecked());
  },[]);
  
    if (!currentUser) {
      return <Redirect to="/login" />;
    }


    return (
        <div>
          <MiniNavbar props={"Checkout"}/>
            <div className="container-fluid mt-4">
                {count!==undefined ? <CheckoutList count={count} total={sum} item={cartItem}/> :
                (<div> No Cart Item</div>)}
            </div>
        </div>
    )
}

export default Checkout
