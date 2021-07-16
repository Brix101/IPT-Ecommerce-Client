import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from'react-router-dom';


import {Modal,Button} from 'react-bootstrap'

import { logout } from "../../actions/auth";
import { history } from "../../helpers/history";

function Topbar({Title}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { user: currentUser } = useSelector((state) => state.auth);  const dispatch = useDispatch();

  
    const logOut = () => {
      dispatch(logout());
      history.push('/');
      window.location.reload();
    };

    return (
        <>
        <nav className="
                    navbar navbar-expand navbar-light
                    bg-white
                    topbar
                    mb-2
                    static-top
                    shadow
                ">
                <h1 className="h3 text-gray-800 border-left-info border-bottom-info">{Title}</h1>

                <div className="navbar-nav ml-auto">
                    <div className="nav-link">
                        <Link className="mr-4 d-none d-lg-inline text-gray-600 text-uppercase">
                          {currentUser.firstname}
                        </Link>
                    </div>
                    <div className="nav-link">
                      <Link onClick={handleShow}>
                          <span className="mr-4 d-none d-lg-inline text-gray-600 text-uppercase">Logout</span>
                      </Link>
                    </div>
                </div>
                </nav>

                <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
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

export default Topbar;
