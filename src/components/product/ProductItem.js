import React, { useState } from 'react'
import {Link} from'react-router-dom';

function Product({product}) {

    const [shadow,setShadow] = useState('');


    return (
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-xs-5 mb-3">
            <Link to={`/product/${product.id}`}>
            <div className={`card h-100  ${shadow}`} 
                onMouseOver={()=>setShadow('shadow-lg border-primary cursor-pointer')} 
                onMouseLeave={()=>setShadow('')}
                >
                <div className="rowalign-items-center mt-2">
                    <div className="col-auto mb-2">
                        <img className="img-fluid product-image" src={product.image} alt="product"/>
                    </div>
                    <div className="col-auto">
                    <div className="h6 mb-2 text-gray-800">
                    {product.name}
                    </div>
                    
                    <div className="h4 mb-2 product-price">₱{product.price}</div>
                    </div>
                </div>
                </div>
                </Link>
        </div>
    )
}

export default Product
