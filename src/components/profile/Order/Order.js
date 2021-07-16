import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Sidebar';
import Orderlist from './Orderlist';

import {getAllOrder,findOrderByStatus} from '../../../actions/order'

function Order() {

  const _order = useSelector(state => state.order);
  const [active, setActive]=useState('pay');

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllOrder());
  },[])

  const getAll = () =>{
    setActive('');
    dispatch(getAllOrder());
  }
  const getToPay = () =>{
    setActive('pay');
    dispatch(findOrderByStatus({status:"To Pay"}));
  }
  const getToRecieve = () =>{
    setActive('recieve');
    dispatch(findOrderByStatus({status:"To Recieve"}));
  }

  const Completed = () =>{
    setActive('completed');
    dispatch(findOrderByStatus({status:"Completed"}));
  }
  const Cancelled = () =>{
    setActive('cancelled');
    dispatch(findOrderByStatus({status:"Cancelled"}));
  }

    return (

        <div id="wrapper" >
        <Sidebar state={"order"}/>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content" className="mt-4">
            
            {/* <Topbar/> */}
            <div className="container">
              <Orderlist Orders={_order}/>
        </div>
      </div>
    </div>
    </div>
    )
}

export default Order;
