import React, { useEffect, useState } from 'react'
import {Link} from'react-router-dom';
import{CgProfile}from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux';

import {getAddress} from '../../actions/address';

export default function Sidebar({state}) {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    
    const [active, setActive]=useState('');

    useEffect(() => {
        switch (state){
            case 'profile':
                onProfileClick()
                break;
            case 'address':
                onAddressClick();
                break;
            case 'password':
                onPasswordClick();
                break;
            case 'order':
                onOrderClick();
                break;
            case 'wishlist':
                onWishlistClick();
                break;
            default:
                break;
        }
    }, [])

    const onProfileClick = () =>{
        setActive('profile');
    }
    const onAddressClick = () =>{
        dispatch(getAddress());
        setActive('address');
    }
    const onPasswordClick = () =>{
        setActive('password');
    }
    const onOrderClick = () =>{
        setActive('order');
    }
    const onWishlistClick = () =>{
        setActive('wishlist');
    }


    return (
        <>
        {/* <!-- Sidebar --> */}
        <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion h-50"
            id="accordionSidebar"
        >            
            <i className="sidebar-brand d-flex align-items-center justify-content-center">
                <div className="sidebar-brand-text mx-3">
                    <CgProfile/>
                    <span className="text-capitalize">{currentUser.firstname}</span>                    
                    <span className="text-capitalize"> Profile</span>
                </div>
            </i>

            <hr className="sidebar-divider" />
            <li className={`nav-item ${active==="profile"&&"active"}`}>
            <Link to={`/profile/myprofile`} className='nav-link' onClick={onProfileClick}>
                <span>Profile</span></Link>
            </li>
            <li className={`nav-item ${active==="address"&&"active"}`}>
                <Link to={`/profile/address`} className='nav-link' onClick={onAddressClick}>
                <span>Address</span></Link>
            </li>
            <li className={`nav-item ${active==="password"&&"active"}`}>
                <Link to={`/profile/password`} className='nav-link' onClick={onPasswordClick}>
                <span>Change Password</span></Link>
            </li>
            <hr className="sidebar-divider" />
            <li className={`nav-item ${active==="order"&&"active"}`}>
            <Link to={`/profile/order`} className='nav-link' onClick={onOrderClick}>
                <span>Order</span></Link>
            </li>
            <li className={`nav-item ${active==="wishlist"&&"active"}`}>
            <Link to={`/profile/wishlist`} className='nav-link' onClick={onWishlistClick}>
                <span>Wishist</span></Link>
            </li>
        </ul>
        </>
    )
}
