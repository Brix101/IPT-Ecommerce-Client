import React, { useEffect, useState } from 'react'
import {FaPlus} from 'react-icons/fa'
import {Modal,Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {addAddress,getAddress} from '../../../actions/address';

import AddressList from './AddressList';
import Sidebar from '../Sidebar';

function Addresses(props) {
    const _address = useSelector((state) => state.address);

    const dispatch = useDispatch();


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [fullname, setFullname] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [address,setAddress] = useState();
    const [postalCode,setPostalCode]= useState();
    const [streetAddress,setStreetAddress]= useState();

    useEffect(() => {
        dispatch(getAddress());
    }, [])
    const newAddress = () =>{
        const newAddress = {
            fullname,
            phoneNumber,
            address,
            postalCode,
            streetAddress
        }
        dispatch(addAddress(newAddress))
        .then(()=>{
            dispatch(getAddress());
            handleClose();
        })
    }


    return (
        <div id="wrapper" >
        <Sidebar state={"address"}/>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content" className="mt-4">
            
            {/* <Topbar/> */}
            <div className="container">
  
  
            <h1 className="h3 text-gray-800 border-left-info">Address</h1>
        <div className="card p-4 ">
            <div className="d-flex align-items-right justify-content-end">
                <a  className="btn btn-primary btn-icon-split" onClick={handleShow}>
                    <span className="icon text-white-50">
                    <FaPlus/>
                    </span>
                    <span className="text">Add Address</span>
                </a>
            </div>
            <div className="align-items-center mt-4">
            {_address!==undefined? (<AddressList addresses={_address}/>):
                (<h1>No Address</h1>)
            }
            </div>
        </div>

    <Modal aria-labelledby="contained-modal-title-vcenter"
        centered show={show}>
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
            New Address
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
                value={address}
                onChange={(e)=>setAddress(e.target.value)}/>
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
            <Button variant="light" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="primary" onClick={newAddress}>
            Submit
            </Button>
        </Modal.Footer>
    </Modal>

    </div>
      </div>
    </div>
    </div>
    )
}

export default Addresses
