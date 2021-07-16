import React, { useEffect, useState } from 'react';
import {ImPlus,ImMinus} from 'react-icons/im';
import {FaShoppingCart} from 'react-icons/fa';
import Navbar from '../layout/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import productService from '../../services/product.service';
import {addToCart,getCart} from '../../actions/cart';
import {Modal,Button} from 'react-bootstrap';

import {addToWishlist} from '../../actions/wishlist';


function ProductPreview(props) {
    const id = props.match.params.id;
    const {message} = useSelector(state => state.message);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [product,setProduct] = useState({});
    const [quantity,setQuantity] = useState(1);

    const dispatch = useDispatch();

    useEffect(()=>{
        productService.getProduct(id)
        .then((res)=>{
            setProduct(res.data);
        })
        .catch(err=>{
            console.log("product preview "+err.message)
        })
    },[]);

    const addToCartClick=()=>{
        const _product={
            product,
            "newQuantity":quantity
        }
        dispatch(addToCart(_product))
        .then(()=>{
            handleShow();
            setQuantity(1);
            dispatch(getCart());
        })
    }
    const _QuantityMinus = () => {
        if(quantity>=2){
            setQuantity(quantity-1);
        }
    }

    const _QuantityAdd = () => {
        if(quantity !== product.quantity){
            setQuantity(parseInt(quantity)+1);
        }else{
            setQuantity(quantity);
        }
    }
    //TODO validation for product quantity
    const onQuantityChange = (e) =>{
        const value = e.target.value;
        if(value>product.quantity){
            setQuantity(product.quantity);
        }else{
            setQuantity(value);
        }
    }

    const ToWishlist = () =>{
        dispatch(addToWishlist(product))
        .then(()=>{
            handleShow();
        })
    }

        
    return (
        <>
        <Navbar/>
        <div className="container-fluid  mt-4">
        <div className="card py-3 border-left-success border-bottom-success">

            <div className="row">
                <div className="col-md-6 mb-md-0">

                <div id="mdb-lightbox-ui"></div>

                <div className="mdb-lightbox">

                    <div className="row product-gallery mx-1">

                    <div className="col-12 mb-0">
                        <div className="card">
                            <a href={`${product.image}`}
                                data-size="710x823">
                                <img className="img-fluid product-image-preview" src={`${product.image}`}/>
                            </a>
                        </div>
                        
                    </div>
                    </div>

                </div>

                </div>
                <div className="col-md-6">

                <h5>{product.name}</h5>
                
                {/* Rating */}
                <ul className="rating">

                </ul>
                <div className="h4 pb-2 product-price">₱{product.price}</div>
                <p className="pr-4">{product.description}</p>
                
                <hr/>

                <div className="form-group row">
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-3 mb-sm-0">
                            <label>Product Quantity</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <i className="btn btn-outline-secondary btn-sm" 
                                    type="button"
                                    onClick={()=>_QuantityMinus()}
                                    ><ImMinus/></i>
                                </div>
                                <input type="number" 
                                    className="form-control form-control-sm"  
                                    min="0"
                                    value={quantity}
                                    onChange={onQuantityChange}/>
                                <div className="input-group-append">
                                    <i className="btn btn-outline-secondary btn-sm" 
                                    type="button"
                                    onClick={()=>_QuantityAdd()}
                                    ><ImPlus/></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-3 mb-sm-0">
                            <div className={`${product.quantity>=20?"":"text-danger"} mb-0`} >
                                <label className="d-flex justify-content-center">Available {product.quantity<=1?"Item":"Items"}</label>
                                <div className="d-flex justify-content-center">
                                    <span className="text">{product.quantity}</span>
                                </div>
                            </div>
                        </div>
                </div>
                {/* <div className="form-group row">
                    <div className="alert alert-danger text-center" role="alert">
                    sample alert
                    </div>
                </div> */}
                <div className="form-group row col-lg-5 justify-content-between">
                    <button type="button" className="btn btn-success">Buy now</button>
                    {product.quantity!==0?                     
                        (<button type="button"
                        className="btn btn-outline-primary"
                        onClick={addToCartClick}
                        ><FaShoppingCart/> Add to Cart</button>
                        ):(
                        <button type="button"
                        className="btn btn-outline-primary"
                        onClick={ToWishlist}
                        > Add to Wishlist</button>)}

                </div>
                </div>
            </div>

        </div>
        </div>

        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
            <Modal.Title>{message}!</Modal.Title>
        </Modal.Header>
            <Modal.Body>
                <span className="text-capitalize">{product.name}</span> {message}
                </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default ProductPreview;
