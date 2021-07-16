import React, { useEffect, useState } from 'react';
import { Link,useHistory } from "react-router-dom";
import CartButton from './CartButton';

import Topbar from '../layout/Topbar';
import { useDispatch, useSelector } from 'react-redux';

import { getCart } from "../../actions/cart";
import { findProductByName,getProducts } from "../../actions/product";

function Navbar({state}) {

  const cart = useSelector(state => state.cart);
  const [profile,setProfile] = useState(false);
  const dispatch = useDispatch();
  const [name,setName] = useState();


  useEffect(() => {
    dispatch(getCart());
    
    dispatch(getProducts());
    setProfile(state);

  },[]);


  const onSearch = (e) =>{
    e.preventDefault();
    dispatch(findProductByName(name));
  }
  const onSearchChange = (e) =>{
    const _name = e.target.value;
    console.log(_name)
    if(_name===''){
      dispatch(getProducts());
    }
    setName(_name)
  }

    return (
      <div className="super_container">
        {/* <!-- Header --> */}
        <header className="header">
          <Topbar/>
          {/* <!-- Header Main --> */}
          <div className="header_main">
            <div className="container">
              <div className="row justify-content-around">
              {/* <!-- Logo --> */}
                <div className="col-lg-2 col-xs-6 col-sm-6  col-3 order-1">
                    <div className="logo_container">
                        <Link to={"/"}>
                          <div className="logo">
                              BBB
                            </div>
                          </Link>
                    </div>
                </div> 
                    {/* <!-- Search --> */}
                    <div className="col-lg-8 col-12 order-lg-2 order-3 text-lg-left text-right">
                    <div className="header_search">
                        {!profile? (
                          <div className="header_search_content">
                          <div className="header_search_form_container">
                            <form onSubmit={onSearch} to={"/"} className="header_search_form">
                              <input type="search" 
                              required="required" 
                              className="header_search_input" 
                              placeholder="Search for products..."
                              onChange={onSearchChange}
                              />
                              <button 
                              className="btn-primary header_search_button trans_300" 
                              value="Submit"
                              // onClick={onSearch}
                              ><img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560918770/search.png" alt=""/></button>
                            </form>
                          </div>
                        </div>
                        ):(
                          <div>
                          </div>
                        )}
                      
                    </div>
                    </div>
                    <div className="col-lg-2 col-xs-6 col-sm-6  col-3 order-2 d-flex align-items-center justify-content-around ">
                            <Link to={'/cart'}>
                                <CartButton cart={cart}/>
                            </Link>
                    </div>
              </div>
            </div>
          </div>
        </header>
        


      </div>
    )
}

export default Navbar;
