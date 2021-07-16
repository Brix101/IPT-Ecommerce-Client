import React, { useEffect, useState } from 'react';
import {GoGear} from'react-icons/go';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';

function MyPofile() {
    const { user: currentUser } = useSelector((state) => state.auth);

    const [isSeller, setIsSeller] = useState(false);

    const [firstname,setFirstname] = useState();
    const [lastname,setLastname] = useState();
    const [email,setEmail] = useState();

    useEffect(()=>{
      setFirstname(currentUser.firstname);
      setLastname(currentUser.lastname);
      setEmail(currentUser.email);
    },[])

    useEffect(() => {
      if (currentUser) {
        setIsSeller(currentUser.roles.includes("ROLE_SELLER"));
      }
    });


    return (
      <div id="wrapper" >
      <Sidebar state={"profile"}/>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content" className="mt-4">
          
          {/* <Topbar/> */}
          <div className="container">


          <h1 className="h3 text-gray-800 border-left-info">My Profile</h1>
        <div className="card p-4">
          <div className="row justify-content-center">
          <div class="col-lg-9">
              <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Firstname</span>
                  </div>
                  <input type="text" className="form-control"
                  value={firstname}/>
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Lastname</span>
                  </div>
                  <input type="text" className="form-control"
                  value={lastname}/>
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Email</span>
                  </div>
                  <input type="email" className="form-control"
                  value={email}/>
                </div>
                  <button className="btn btn-primary btn-block">Save</button>
          </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    </div>
    )
}

export default MyPofile
