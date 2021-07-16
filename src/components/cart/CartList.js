import React from 'react'
import { Link } from 'react-router-dom';
import CartItem from './CartItem'

function CartList({count,total,item}) {

    return (
        <>
            <div className="card py-3 border-left-success border-bottom-success">

            <div className="row">

                <div className="col-lg-8">

                <div className="mb-3">
                    <div className="card-body">

                    <h5 className="mb-4">Cart (<span>{count}</span> {count<=1?"item":"items"})</h5>

                    <hr className="mb-2"/>

                    {item.map((product, index)=>
                        <CartItem key={index} item={product} />)}
                    

                    </div>
                </div>

                </div>

                <div className="col-lg-4">

                <div className="card mb-3 mr-4">
                    <div className="card-body">

                    <h5 className="mb-3">The total amount of all {count<=1?"item":"items"}</h5>

                    <div className="">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                        <strong>Temporary amount</strong>
                        <span className="h3 product-price">₱ {total}</span>
                        </div>
                        <hr/>
                    </div>
                    {count!==0&&
                        <Link to="/checkout"  
                            className="btn btn-primary btn-block waves-effect waves-light">
                            go to checkout</Link>}

                    </div>
                </div>

                </div>

            </div>

            </div>
        </>
    )
}

export default CartList
