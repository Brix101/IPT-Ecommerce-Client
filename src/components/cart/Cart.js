import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import CartList from './CartList';
import MiniNavbar from '../layout/MiniNavbar';
import { useDispatch, useSelector } from 'react-redux';

import { loggedin } from "../../actions/auth";
import { getCart } from "../../actions/cart";
function Cart() {

    const { user: currentUser } = useSelector((state) => state.auth);
    const { count } = useSelector((state) => state.cart);
    const { cartItem } = useSelector((state) => state.cart);
    const { sum } = useSelector((state) => state.cart);

  
    const dispatch = useDispatch();
  
    dispatch(loggedin());

    
  useEffect(() => {
    dispatch(getCart());
  },[]);
  
    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
        <div>
            <MiniNavbar props={"Cart"}/>
            <div className="container-fluid mt-4">
                {count!==undefined ? <CartList count={count} total={sum} item={cartItem}/> :
                (<div> No Cart Item</div>)}
            </div>
        </div>
    )
}

export default Cart
