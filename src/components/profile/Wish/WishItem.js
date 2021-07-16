import React, { useEffect, useState } from 'react'
import {Link} from'react-router-dom';
import {FaShoppingCart} from 'react-icons/fa'


import productService from '../../../services/product.service';

function WishItem({item}) {
    const [shadow,setShadow] = useState('');
    const [product,setProduct] = useState({});

    useEffect(()=>{
        getProduct();
    });
    const getProduct = ()=>{
        productService.getProduct(item.productId)
        .then((res)=>{
            setProduct(res.data);
        })
        .catch(err=>{
            console.log("Cart item "+err.message)
        })
    }
    return (
            <div className="col-lg-3 col-md-4 col-sm-5 col-xs-5 mb-3">
                <Link to={`/product/${product.id}`}>
                <div className={`card h-100 ${shadow}`} 
                    onMouseOver={()=>setShadow('shadow-lg border-primary cursor-pointer')} 
                    onMouseLeave={()=>setShadow('')}
                    >
                    <div className="align-items-center mt-2">
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
                                            
                    {product.quantity===0&&
                        <div className="card centered opacity-half h-100 btn-block">    
                            <div className="d-flex align-items-center justify-content-center">
                                <div className="alert alert-danger text-center">
                                    Product Unavailable
                                </div>
                            </div>
                        </div>}
                    </div>
                    </Link>
            </div>
    )
}

export default WishItem
