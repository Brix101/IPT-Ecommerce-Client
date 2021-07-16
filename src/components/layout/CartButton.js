import React from 'react'
import {FaShoppingCart} from 'react-icons/fa'

function CartButton({cart}) {
    return (
        <div>
                    <div class="btn btn-outline-primary">
                    <FaShoppingCart/> 
                    <span class="badge badge-primary">
                        {cart!==undefined?
                        <>
                        {cart.count}
                        </>
                        :0}
                    </span>
                    </div>
        </div>
    )
}

export default CartButton
