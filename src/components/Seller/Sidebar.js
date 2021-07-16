import React, { useEffect, useState } from 'react'
import {Link} from'react-router-dom';
import {AiFillDashboard} from 'react-icons/ai';
import{FaProductHunt} from 'react-icons/fa';
import {BsClipboardData} from 'react-icons/bs';

export default function Sidebar({state}) {

    const [active, setActive]=useState('');

    useEffect(() => {
        switch (state){
            case 'order':
                onOrderClick();
                break;
            case 'product':
                onProductClick();
                break;
            default:
                break;
        }
    }, [])
    const onDashboardClick = () =>{
        setActive('dashboard');
    }
    const onOrderClick = () =>{
        setActive('order');
    }
    const onProductClick = () =>{
        setActive('product');
    }

    return (
        <>
        {/* <!-- Sidebar --> */}
        <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
        >
            {/* <!-- Sidebar - Brand --> */}
            <Link
            className="sidebar-brand d-flex align-items-center justify-content-center"
            to={"/"}
            >
            <div className="sidebar-brand-text mx-3">BBB</div>
            </Link>
            <hr className="sidebar-divider" />

            {/* <li className={`nav-item ${active==="dashboard"&&"active"}`}>
            <Link className="nav-link" to={"/seller"} onClick={onDashboardClick}>
                <AiFillDashboard/>
                <span>Dashboard</span></Link>
            </li>
            <hr className="sidebar-divider" /> */}
            <li className={`nav-item ${active==="order"&&"active"}`}>
            <Link className="nav-link" to={"/seller/order"} onClick={onOrderClick}>
                <BsClipboardData/>
                <span>Orders</span></Link>
            </li>
            <li className={`nav-item ${active==="product"&&"active"}`}>
                <Link className="nav-link collapsed" to={"/seller/product"} onClick={onProductClick}>
                    <FaProductHunt/>
                <span>Products</span></Link>
            </li>

            <hr className="sidebar-divider" />
        </ul>
        </>
    )
}
