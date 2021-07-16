import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from'react-router-dom';


import {Modal,Button} from 'react-bootstrap'

import { logout } from "../../actions/auth";
import { clearMessage } from "../../actions/message";
import { history } from "../../helpers/history";

function Topbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showSellerBoard, setShowSellerBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowSellerBoard(currentUser.roles.includes("ROLE_SELLER"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  });

  const logOut = () => {
    dispatch(logout());
    history.push('/');
    window.location.reload();
  };


    return (
        <>
            {/* <!-- Top Bar --> */}
          <div className="top_bar d-flex align-items-center justify-content-end text-uppercase">
              <div className="top_bar_user">
                    {showSellerBoard && (
                      <div  className="nav-link">
                        <Link to={"/seller/order"}>
                          Seller Board
                        </Link>
                      </div>
                    )}

                    {showAdminBoard && (
                      <div  className="nav-link">
                        <Link to={"/admin"}>
                          Admin Board
                        </Link>
                      </div>
                    )}
              </div>
              <div className="top_bar_user">
                  {currentUser ? (
                    <>
                    {!showSellerBoard &&
                      <div className="nav-link"> 
                        <Link to={"/profile/myprofile"}>{currentUser.firstname}</Link>
                        </div>}
                      <div className="nav-link"> 
                        <Link onClick={handleShow}>
                          Logout
                        </Link>
                      </div>
                    </>
                  ):(
                    <>
                      <div className="nav-link">
                        <Link to={"/register"}>Register</Link>
                        </div>
                      <div className="nav-link">
                        <Link to={"/login"}>Login</Link>
                        </div>
                    </>
                  )}
              </div>
          </div>


        <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Ready to Leave?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Select "Logout" below if you are ready to end your current session.</Modal.Body>
        <Modal.Footer>          
          <Button variant="primary" onClick={logOut}>
            Logout
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      
        </>
    )
}

export default Topbar
