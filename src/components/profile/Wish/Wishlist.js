import React from 'react';
import WishItem from './WishItem';

function Wishlist({products}) {
    return (
        <>
            <div id="products d-flex justifu-content-center">
                <div className="container py-3">
                    <div className="row">
                        {products.map((product, index) => 
                        <WishItem key={index} item={product}/> )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Wishlist
