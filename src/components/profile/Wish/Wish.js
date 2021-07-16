import React, { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';

import {getWishlist} from '../../../actions/wishlist'

import Wishlist from './Wishlist';
import Sidebar from '../Sidebar';

function Wish() {
    const wishlist = useSelector(state => state.wishlist);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getWishlist());
    })

    return (
        <div id="wrapper" >
        <Sidebar state={"wishlist"}/>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content" className="mt-4">
            
            {/* <Topbar/> */}
            <div className="container">
  
  
            <h1 className="h3 text-gray-800 border-left-info">Wishlist</h1>

        <div className="card">
            {/* {wishlist!==null ?  */}
            <Wishlist products={wishlist}/> 
            {/* :  (<div> No Wishlist Item</div>)} */}
        </div>

        </div>
      </div>
    </div>
    </div>
    )
}

export default Wish;
