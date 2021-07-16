import React from 'react';
import OrderItem from './OrderItem';

function Orderlist({Orders}) {
    return (
        <div>
            {Orders.map((order,index)=>
                <OrderItem key={index} order={order}/>)}
        </div>
    )
}

export default Orderlist
