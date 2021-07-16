import React, { useEffect, useState } from 'react';

import productService from '../../../services/product.service';

function OrderItem({order}) {

    const [product,setProduct] = useState({});

    useEffect(()=>{
        getProduct();     
    });
    const getProduct = ()=>{
        productService.getProduct(order.productId)
        .then((res)=>{
            setProduct(res.data);
        })
        .catch(err=>{
            console.log("Cart item "+err.message)
        })
    }

    return (
    <>
    <div className="card p-2 mb-2 shadow">
        <div className="row">
        <div className={`col-xl-3 d-flex justify-content-center align-item-center`}>
            <img className="img-fluid product-image"
            src={product.image} alt="Product"/>
        </div>
        <div className="col-xl-8">
            <div className=" row d-flex justify-content-between mb-4">
                <div>
                    <h5 className={`item-text `}>{product.name}</h5>
                </div>
                <div>

                </div>
            </div>
            <div className=" row d-flex justify-content-start mb-4">
                    <p className={`mb-0`}><span><strong >Price: {product.price}</strong></span></p>
            </div>
            

            <div className=" row d-flex justify-content-between">
                <div>
                    <p className={`mb-0`}><span><strong >Quantity: {order.quantity}</strong></span></p>
                </div>
                <div className="d-flex align-items-center justify-content-end">
                    <div className="d-flex align-items-center justify-content-center"><span>Order Total: </span></div>
                    <h3>
                        <span className="label label-default product-price"> ₱{order.total}</span>
                    </h3>
                </div>
            </div>
        </div>
    </div>
    </div>
    </>
    )
}

export default OrderItem
