import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Topbar from '../Topbar';
import Sidebar from '../Sidebar';

import {updateStatus,findBySeller} from '../../../actions/order';

import Orderlist from './Orderlist';

function Orders() {
  
  const _order = useSelector(state => state.order);

  const dispatch = useDispatch();

  const [active, setActive]=useState('pay');

  useEffect(()=>{
    getToPay();
  },[])

  const getAll = () =>{
    setActive('');
    dispatch(findBySeller());
  }
  const getToPay = () =>{
    setActive('pay');
    dispatch(findBySeller({status:"To Pay"}));
  }
  const getToRecieve = () =>{
    setActive('recieve');
    dispatch(findBySeller({status:"To Recieve"}));
  }

  const Completed = () =>{
    setActive('completed');
    dispatch(findBySeller({status:"Completed"}));
  }
  const Cancelled = () =>{
    setActive('cancelled');
    dispatch(findBySeller({status:"Cancelled"}));
  }

  const itemPacked = (e) =>{
    dispatch(updateStatus(e,{status:"To Recieve"}))
    .then(()=>{
      getToPay();
    })
    getToPay();
}

    return (
        <>
              <div id="page-top">
        <div id="wrapper">
          <Sidebar state={"order"}/>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              {/* <Topbar/> */}
        <Topbar Title={"Orders"}/>
          <div className="container">
          <Orderlist Orders={_order}/>
        </div> 
        </div>
        </div>
      </div>
      </div>
        
        </>
    )
}

export default Orders
