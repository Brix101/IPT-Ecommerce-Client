import React, { useEffect, useState } from 'react';

import productService from '../../../services/product.service';

function OrderItem({order}) {

    const [product,setProduct] = useState({});
    const [status,setStatus] = useState();

    useEffect(()=>{
        getProduct();    
        setStatus(order.status);
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
        <div className="col-xl-3 d-flex justify-content-center align-item-center">
            <img className="img-fluid product-image"
            src={product.image} alt="Product"/>
        </div>
        <div className="col-xl-3 pl-4">
            <div className=" row d-flex justify-content-start mb-2">
                <div>
                    <h5 className={`item-text `}>{product.name}</h5>
                </div>
            </div>
            <div className=" row d-flex justify-content-start mb-2">
                <p className={`mb-0`}><span><strong >Price: {product.price}</strong></span></p>
            </div>
            
            <div className=" row d-flex justify-content-start mb-4">
                    <p className={`mb-0`}><span><strong >Quantity: {order.quantity}</strong></span></p>
            </div>
            <div className="row d-flex justify-content-start">
                <div className="d-flex align-items-center justify-content-center"><span>Order Total: </span></div>
                <h3>
                    <span className="label label-default product-price"> ₱{order.total}</span>
                </h3>
            </div>
        </div>
        <div className="col-xl-6">
                <div className=" row d-flex justify-content-start mb-1">
                <p className={`mb-0`}>Fullname : </p>
                    <h5 className="item-text">{order.fullname}</h5>
                </div>
                <div className=" row d-flex justify-content-start mb-1">
                    <p className={`mb-0`}>Phone Number : </p>
                    <p className="item-text"> {order.phonenumber}</p>
                </div>
                <div className=" row d-flex justify-content-start">
                    <p className={`mb-0`}>Address : </p>
                    <p className="item-text"> {order.address}</p>
                </div>
        </div>
    </div>
    </div>
    </>
    )
}

export default OrderItem
