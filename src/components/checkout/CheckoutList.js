import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import ChechoutItem from './CheckoutItem';
import {GoGear} from'react-icons/go';
import {Modal,Button} from 'react-bootstrap';
import AddressList from './Address/AddressList';
import { useDispatch, useSelector } from 'react-redux';

import {getAddress} from '../../actions/address';
import {createOrder} from '../../actions/order';

function CheckoutList({count,total,item}) {
    const _address = useSelector((state) => state.address);
    const {message} = useSelector((state) => state.message);
    const [showAddress, setShowAddress] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const [selectedAddress,setSelectedAddress]=useState();
    const [_message,setMessage]=useState();

    const history = useHistory();

    useEffect(() => {
        dispatch(getAddress());
        setMessage(message);
    }, [message])


    const onChooseClick = (e)=>{
        setShowAddress(false);
        setSelectedAddress(e);
    }

    const onShowAddress = () =>{
        dispatch(getAddress())
        .then(()=>{
            setShowAddress(true);
        })
    }
    const onOrderPlace = () =>{
        setShowModal(true);
        if(selectedAddress!==undefined){
        item.map((product)=>{
            const order = {
                cartId:item.id,
                productId : product.productId,
                quantity : product.quantity,
                total : product.total,
                fullname : selectedAddress.fullname,
                phonenumber: selectedAddress.phonenumber,
                address: selectedAddress.streetaddress+", "+selectedAddress.address+", "+selectedAddress.postalcode
            }
            console.log(order)
            dispatch(createOrder(order));
        })
        }else{
            setMessage("Please Select Address")
        }
    }

    const onModalClose =()=>{
        setShowModal(false);
        if(selectedAddress!==undefined){
            history.push('/profile/order');
            window.location.reload();
        }
    }
    return (
        <>
            <div className="card py-3 border-left-success border-bottom-success">

            <div className="row">

                <div className="col-lg-8">

                <div className="mb-3">
                    <div className="card-body">

                    <h5 className="mb-4">Checkout (<span>{count}</span> {count===1?"item":"items"})</h5>

                    <hr className="mb-2"/>

                    {item.map((product, index)=>
                        <ChechoutItem key={index} item={product} />)}
                    </div>
                </div>

                </div>

                <div className="col-lg-4">
                <div className="card mb-3 mr-4">
                    <div className="card-body">
                    <div className="d-flex justify-content-end mb-3">
                        <button className="btn btn-info btn-icon-split shadow" onClick={onShowAddress}>
                        <span className="icon">
                            <GoGear style={{ color: 'black'}}/>
                        </span>
                            <span className="text">Choose Address</span>
                        </button>
                    </div>

                <div className="card mb-2  pl-4 pr-4 p-2">
                <div className="row" >
                    <div className="col-lg-12">
                            <div className="row d-flex justify-content-between mb-2">
                                <div>
                                    <i className="btn-icon-split">
                                        <span className="icon text">Full Name </span>
                                    </i>
                                        <span className="text item-text">{selectedAddress!==undefined && selectedAddress.fullname}</span>
                                </div>
                            </div>
                            <div className=" row d-flex justify-content-between mb-2">
                                <div>
                                    <i className="btn-icon-split">
                                        <span className="icon text">Phone</span>
                                    </i>
                                        <span className="text item-text"> {selectedAddress!==undefined && selectedAddress.phonenumber}</span>
                                </div>
                            </div>
                            <div className=" row d-flex justify-content-between">
                                <div>
                                    <i className="btn-icon-split">
                                        <span className="icon text">Address </span>
                                    </i>
                                    {selectedAddress!==undefined? 
                                        (<span className="text item-text">  
                                            {selectedAddress.streetaddress}, 
                                            {selectedAddress.address}, 
                                            {selectedAddress.postalcode}</span>):('')}
                                </div>
                            </div>
                    </div>
                </div>
            </div>


                    </div>
                </div>

                <div className="card mb-3 mr-4">
                    <div className="card-body">

                    <h5 className="mb-3">The total amount of</h5>

                    <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                            <strong>The total amount of</strong>
                            <strong>
                            <p className="mb-0">(including VAT)</p>
                            </strong>
                        </div>
                        <span><strong>{total}</strong></span>
                        </li>
                    </ul>

                    <button to="/checkout"  
                    className="btn btn-primary btn-block waves-effect waves-light"
                    onClick={onOrderPlace}>
                        Place Order</button>

                    </div>
                </div>

                </div>

            </div>

            </div>

        <Modal aria-labelledby="contained-modal-title-vcenter"
        centered show={showAddress}
        onHide={()=>setShowAddress(false)}
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Choose Address
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {showAddress && 
            <AddressList addresses={_address} onChooseClick={onChooseClick}/>}
        </Modal.Body>
        <Modal.Footer>            
            <Button variant="light" onClick={() => setShowAddress(false)}>
                Cancel
            </Button>
            <Link to="/profile/address">
                <Button variant="primary">
                    Add Address
                </Button>
            </Link>
        </Modal.Footer>
    </Modal>


    <Modal show={showModal} onHide={()=>setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>{_message}!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{_message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default CheckoutList
