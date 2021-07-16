import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function AddressItem({selectedAddress}) {

    const [fullname, setFullname] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [address,setNewAddress] = useState();
    const [postalCode,setPostalCode]= useState();
    const [streetAddress,setStreetAddress]= useState();

    useEffect(()=>{
        if(selectedAddress!==undefined){
            setFullname(selectedAddress.fullname);
            setPhoneNumber(selectedAddress.phonenumber);
            setNewAddress(selectedAddress.address);
            setPostalCode(selectedAddress.postalcode);
            setStreetAddress(selectedAddress.streetaddress);
        }
    },[])


    return (
        <div className="card mb-2  pl-4 pr-4 p-2">
            <div className="row" >
                <div className="col-lg-12">
                        <div className="row d-flex justify-content-between mb-2">
                            <div>
                                <i className="btn-icon-split">
                                    <span className="icon text">Full Name</span>
                                </i>
                                    <span className="text item-text"> {fullname}</span>
                            </div>
                        </div>
                        <div className=" row d-flex justify-content-between mb-2">
                            <div>
                                <i className="btn-icon-split">
                                    <span className="icon text">Phone</span>
                                </i>
                                    <span className="text item-text"> {phoneNumber}</span>
                            </div>
                        </div>
                        <div className=" row d-flex justify-content-between">
                            <div>
                                <i className="btn-icon-split">
                                    <span className="icon text">Address </span>
                                </i>
                                    <span className="text item-text"> {streetAddress}, </span>
                                    <span className="text item-text">{address}, </span>
                                    <span className="text item-text">{postalCode}</span>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default AddressItem
