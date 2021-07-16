import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import Navbar from '../components/layout/Navbar'
import ProductList from '../components/product/ProductList'


import { useDispatch, useSelector } from "react-redux";
import { loggedin } from "../actions/auth";


const Home = () => {
  const [content, setContent] = useState("");
  const products = useSelector(state => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(loggedin());

    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);


  

  return (
    <>
      <Navbar/>
      <div className="container">   
        {content==="Network Error"?(          
        <header className="jumbotron">
          <h3>{content}</h3>
        </header>):(
        <ProductList products={products}/>
        )} 
    </div>
    </>
  );
};

export default Home;
