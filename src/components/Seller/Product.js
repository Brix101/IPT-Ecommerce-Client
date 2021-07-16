import React, { useEffect } from 'react'
import {FaPlus} from 'react-icons/fa'
import {Link} from 'react-router-dom';
import Topbar from './Topbar';


import { getProducts } from "../../actions/product";
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';


import ProductList from '../product/ProductList';

function Products() {  

  const products = useSelector(state => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  });

    return (
        <>
              <div id="page-top">
        <div id="wrapper">
          <Sidebar state={"product"}/>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              {/* <Topbar/> */}
        <Topbar Title={"Products"}/>
          <div className="container-fluid">
            <div className="col-sm-3 d-sm-flex align-items-center justify-content-between' mb-2">
            <Link to={"/seller/product/add"} className="btn btn-primary btn-icon-split">
                <span className="icon text-white-50">
                <FaPlus/>
                </span>
                <span className="text">Add Product</span>
              </Link>
            </div>

            {/* <!-- Content Row --> */}
            {products!==null? (<ProductList products={products}/>):(
              <h1>No Products</h1>
            )
            }
                
            
        </div> 

        </div>
        </div>
      </div>
      </div>
        
        </>
    )
}

export default Products
