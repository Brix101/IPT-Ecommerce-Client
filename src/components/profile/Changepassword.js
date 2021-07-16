import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {changePassword} from '../../actions/auth';

import Sidebar from './Sidebar';

function Changepassword() {
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const [currentPassword,setCurrentPassword]= useState();
    const [newPassword,setNewPassword]= useState();
    const [confirmPassword,setConfirmPassword]= useState();

    const onSubmitClick = () =>{
        const password={
            currentPassword,
            newPassword,
            confirmPassword
        }
        dispatch(changePassword(password))
        .then(()=>{
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        })

    }

    return (

        <div id="wrapper" >
        <Sidebar state={"password"}/>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content" className="mt-4">
            
            {/* <Topbar/> */}
            <div className="container">
  
  
            <h1 className="h3 text-gray-800 border-left-info">Change Password</h1>

        <div className="card p-4 align-items-center">
            <div>
                <div class="form-group row">
                    <label class="col-form-label">Current Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control"
                        value={currentPassword}
                        onChange={(e)=>setCurrentPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-form-label">New Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control"
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
                        />
                    </div>
                </div>            <div class="form-group row">
                    <label class="col-form-label">Confirm Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>
                {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                    {message}
                    </div>
                </div>
                )}
                <button onClick={onSubmitClick} className="btn btn-primary">Confirm</button>
                
            </div>
        </div>

        </div>
      </div>
    </div>
    </div>
    )
}

export default Changepassword
