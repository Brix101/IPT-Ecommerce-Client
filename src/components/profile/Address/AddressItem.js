import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import {Modal,Button} from 'react-bootstrap';

import {updateAddress,removeAddress,getAddress} from '../../../actions/address'

function AddressItem({address}) {

    const dispatch = useDispatch();

    const [showAdding, setShowAdding] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [fullname, setFullname] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [newAddress,setNewAddress] = useState();
    const [postalCode,setPostalCode]= useState();
    const [streetAddress,setStreetAddress]= useState();

    useEffect(()=>{
        if(address!==undefined){
            setFullname(address.fullname);
            setPhoneNumber(address.phonenumber);
            setNewAddress(address.address);
            setPostalCode(address.postalcode);
            setStreetAddress(address.streetaddress);
        }
    },[])
    
    const _updateAddress = () =>{
        const Address = {
            fullname,
            phoneNumber,
            newAddress,
            postalCode,
            streetAddress
        }

        dispatch(updateAddress(address.id,Address))
            .then(()=>{
                dispatch(getAddress());
                setShowAdding(false);
            })
    }
    const deleteAddress = () =>{
        dispatch(removeAddress(address.id));
    }


    return (
        <div className="card mb-2  pl-4 pr-4 p-2">
            <div className="row" >
                <div className="col-lg-12">
                        <div className="row d-flex justify-content-between mb-2">
                            <div>
                                <i className="btn-icon-split">
                                    <span className="icon text">Full Name</span>
                                </i>
                                    <span className="text item-text"> {address!==undefined? address.fullname : ''}</span>
                            </div>
                            <div className="d-flex justify-content-end">
                                <a className="btn btn-secondary" onClick={()=>setShowAdding(true)}>
                                    Edit
                                </a>
                                <a className="btn btn-danger" onClick={()=>setShowConfirm(true)}>
                                    Remove
                                </a>  
                            </div>
                        </div>
                        <div className=" row d-flex justify-content-between mb-2">
                            <div>
                                <i className="btn-icon-split">
                                    <span className="icon text">Phone</span>
                                </i>
                                    <span className="text item-text"> {address!==undefined?  address.phonenumber : ''}</span>
                            </div>
                        </div>
                        <div className=" row d-flex justify-content-between">
                            <div>
                                <i className="btn-icon-split">
                                    <span className="icon text">Address </span>
                                </i>
                                    <span className="text item-text"> {address!==undefined? address.streetaddress : ''}, </span>
                                    <span className="text item-text">{address!==undefined? address.address : ''}, </span>
                                    <span className="text item-text">{address!==undefined? address.postalcode : ''}</span>
                            </div>
                        </div>
                </div>
            </div>
        <Modal show={showConfirm} onHide={()=>setShowConfirm(false)}>
        <Modal.Header>
        <Modal.Title>Delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>select "Remove" to Remove Address.</Modal.Body>
        <Modal.Footer>        
        <Button variant="primary" onClick={deleteAddress}>
            Remove
        </Button>
        <Button variant="secondary" onClick={()=>setShowConfirm(false)}>
            Cancel
        </Button>
        </Modal.Footer>
    </Modal>


    <Modal aria-labelledby="contained-modal-title-vcenter"
        centered show={showAdding}>
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
            Update Address
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label>Full Name</label>
                    <input type="text" class="form-control" placeholder="Full Name"
                    value={fullname}
                    onChange={(e)=>setFullname(e.target.value)}/>
                </div>
                <div class="form-group col-md-6">
                    <label>Phone Number</label>
                    <input type="number" class="form-control" placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e)=>setPhoneNumber(e.target.value)}/>
                </div>
            </div>
            <div class="form-group">
                <label>Region, Provinve, City, Barangay</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="Region, Provinve, City, Barangay"
                value={newAddress}
                onChange={(e)=>setNewAddress(e.target.value)}
                />
            </div>
            <div class="form-group">
                <label>Postal Code</label>
                <input type="number" class="form-control" placeholder="Postal Code"
                value={postalCode}
                onChange={(e)=>setPostalCode(e.target.value)}/>
            </div>
            <div class="form-group">
                <label>Street Name, Building, House No.</label>
                <input type="text" class="form-control" placeholder="Street Name, Building, House No." 
                value={streetAddress}
                onChange={(e)=>setStreetAddress(e.target.value)}/>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="light" onClick={() => setShowAdding(false)}>
                Cancel
            </Button>
            <Button variant="primary" onClick={_updateAddress}>
            Submit
            </Button>
        </Modal.Footer>
    </Modal>
        </div>
    )
}

export default AddressItem
