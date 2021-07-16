import React from 'react';
import Product from './ProductItem';

function ProductList({products}) {

    return (
        <>
            <div id="products d-flex justifu-content-center">
                <div className="container py-3">
                    <div className="row">
                        {products.map((product, index) => 
                        <Product key={index} product={product}/> )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductList;
