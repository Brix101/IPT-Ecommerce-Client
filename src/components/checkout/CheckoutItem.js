import React, { useEffect, useState } from 'react';

import productService from '../../services/product.service';

function ChechoutItem({item}) {
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




    //Todo limit the quantity from database

    return (
        <div className="card p-4 mb-2">
            <div className="row">
                        <div className="col-md-5 col-lg-3 col-xl-3 d-flex justify-content-center align-item-center">
                            <img className="img-fluid product-image"
                            src={product.image} alt="Product"/>
                        </div>
                        <div className="col-md-7 col-lg-9 col-xl-9">
                        <div >
                            <div className=" row d-flex justify-content-between mb-2">
                                <div>
                                    <h5 className="item-text">{product.name}</h5>
                                </div>
                            </div>
                            <div className=" row d-flex justify-content-between mb-2">
                                <div>
                                <p className="mb-0"><span><strong >Price: {product.price}</strong></span></p>
                                </div>
                                
                            </div>
                            <div className="row d-flex justify-content-between mb2">
                                <div>
                                    <p className="mb-0"><span><strong >Quantity: {item.quantity}</strong></span></p>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-end">
                                <div>
                                    <h3><span className="label label-default product-price">Total: ₱{item.total}</span></h3>
                                    
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>

        </div>
    )
}

export default ChechoutItem
