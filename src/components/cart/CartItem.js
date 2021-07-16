import React, { useEffect, useState } from 'react';
import {ImPlus,ImMinus} from 'react-icons/im';
import {FaTrashAlt,FaCheck} from 'react-icons/fa'; 
import { useDispatch, useSelector } from 'react-redux';

import {Modal,Button} from 'react-bootstrap';

import productService from '../../services/product.service';
import {removeItem,updateQuantity,isChecked} from '../../actions/cart';
import {addToWishlist} from '../../actions/wishlist';

function CartItem({item}) {

    const {message} = useSelector(state => state.message);

    const [product,setProduct] = useState({});
    const [quantity,setQuantity] = useState(item.quantity)
    const [totalPrice,setTotalPrice] = useState(item.quantity)
    const [checked,setChecked] = useState();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    useEffect(()=>{
        getProduct();     
        setChecked(item.isChecked);
        setTotalPrice(product.price *quantity);

        if(product.quantity<item.quantity){
            setQuantity(product.quantity);


            const _product={
                product,
                "newQuantity": product.quantity
            }
            dispatch(updateQuantity(_product))
        }
    });

    

    const getProduct = ()=>{
        productService.getProduct(item.productId)
        .then((res)=>{
            setProduct(res.data);
        })
        .catch(err=>{
            console.log("Cart item "+err.message)
        })
    }

    const removeOnClick = ()=>{
        dispatch(removeItem(product.id))
        .then(()=>{
            handleClose();
            window.location.reload();
        })
        
    }

    const _QuantityMinus = () => {
        if(quantity > 1){
            setQuantity(quantity-1);

            const _product={
                product,
                "newQuantity": quantity-1
            }
            dispatch(updateQuantity(_product));
        }
    }

    const _QuantityAdd = () => {
        if(quantity < product.quantity){
            setQuantity(parseInt(quantity)+1);

            const _product={
                product,
                "newQuantity": parseInt(quantity)+1
            }
            dispatch(updateQuantity(_product));

        }
    }

    const onChangeQuantity = (e) =>{
        const value = e.target.value;
        if(value>product.quantity){
            setQuantity(product.quantity);

            
        const _product={
            product,
            "newQuantity": product.quantity
        }
        dispatch(updateQuantity(_product));
        }else{
            setQuantity(value);

            
        const _product={
            product,
            "newQuantity": value
        }
        dispatch(updateQuantity(_product));
        }

        setTotalPrice(product.price *quantity);
    }
    const toWishlist = () =>{
        dispatch(addToWishlist(product))
        .then(()=>{
            setShow2(true);
        })
    }
    const handleClose2 = ()=>{
        setShow2(false);
        window.location.reload();
    }
    const onCheckClick = ()=>{
        dispatch(isChecked(product));
        window.location.reload();
    }

    return (
        <div className={`card pr-4 pl-4 pt-2 pb-2 mb-2 ${product.quantity !== 0 ?"":"alert alert-secondary"}`}>
            <div className="row">
                <div className="col-lg-1">
                    <div className="d-flex align-items-center justify-content-center h-100">
                        <i className="btn btn-outline-primary btn-sm" 
                        type="button"
                        onClick={onCheckClick}>
                        <FaCheck className={`${checked ? "visible" : "invisible"}`}/>
                        </i>
                    </div>
                </div>
                <div className={`col-xl-3 d-flex justify-content-center align-item-center ${product.quantity === 0 && "opacity-half"}`}>
                    <img className="img-fluid product-image"
                    src={product.image} alt="Product"/>
                    {product.quantity===0&&
                    <div className="centered  h-100">    
                            <div className="d-flex align-items-center justify-content-center  h-100">
                                <div className="alert alert-danger text-center">
                                    Product Unavailable
                                </div>
                            </div>
                    </div>}
                </div>
                <div className="col-xl-8">
                    <div className=" row d-flex justify-content-between mb-1">
                        <div>
                            <h5 className={`item-text ${product.quantity === 0 && "opacity-half"}`}>{product.name}</h5>
                        </div>
                        <div>
                            <button onClick={handleShow} className="btn text-uppercase btn-light btn-icon-split btn-sm">
                                    <span className="icon text-white-50">
                                    <FaTrashAlt/>
                                    </span>
                                    <span className="text">Remove item</span>
                                </button>
                        </div>
                    </div>
                    <div className=" row d-flex justify-content-between mb-2">
                        <div>
                            <p className={`mb-0 ${product.quantity === 0 && "opacity-half"}`}><span><strong >Price: ₱{product.price}</strong></span></p>
                        </div>
                        <div>
                            {product.quantity === 0 && (                                    
                            <button onClick={toWishlist} className="btn text-uppercase btn-secondary btn-sm">
                                <span className="text">Move To Wishlist</span>
                            </button>)}

                        </div>
                    </div>
                    
                    {product.quantity!==0&&
                    <div className=" row d-flex justify-content-between">
                        <div className="d-flex align-items-center justify-content-start">
                            <div class="form-group mb-0">
                                <label className="mb-0">Quantity :</label>
                                <div className="input-group w-50">
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
                                        onChange={onChangeQuantity}
                                        />
                                    <div className="input-group-append">
                                        <i className="btn btn-outline-secondary btn-sm" 
                                        type="button"
                                        onClick={()=>_QuantityAdd()}
                                        ><ImPlus/></i>
                                    </div>
                                </div>
                                <p className={`${product.quantity>=20?"":"text-danger"} mb-0`}>{product.quantity} {product.quantity<=1?"item":"items"} Available</p>
                            </div>
                            </div>
                        <div className="d-flex align-items-end justify-content-end">
                            <h3><span className="label label-default product-price">₱{totalPrice}</span></h3>
                        </div>
                    </div>}
                </div>
            </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Remove?</Modal.Title>
            </Modal.Header>
            <Modal.Body>select "Remove" to Remove {product.name} from cart?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="primary" onClick={removeOnClick}>
                Remove
            </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={show2} onHide={handleClose2} centered>
        <Modal.Header>
            <Modal.Title>{message}!</Modal.Title>
        </Modal.Header>
            <Modal.Body>
                <span className="text-capitalize">{product.name}</span> {message}
                </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default CartItem
