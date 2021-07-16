import React from 'react'
import {Link} from'react-router-dom';
import Topbar from './Topbar'

export default function MiniNavbar({props}) {


    return (
        <>
          <div className="super_container">
              <header className="header">
                <Topbar/>
                <div className="header_main">
                  <div className="container">
                      <div className="row justify-content-start">
                        <div className="col-lg-2 col-xs-6 col-sm-6  col-3">
                            <div className="logo_container">
                                  <div className="d-flex align-items-center logo">
                                  <Link to={"/"}>
                                  BBB
                                  </Link>
                                  </div>
                            </div>
                        </div> 
                        
                        <div className="d-flex align-items-center">
                          <h3 className="item-text">
                            {props}
                          </h3>
                        </div>
                        </div>
                    </div>
                </div>
              </header>

            </div>

          </>
    )
}
