import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import {Link} from'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import MiniNavbar from "../layout/MiniNavbar";
import { isEmail } from "validator";

import { register,login } from "../../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};


const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpass, setRepeatpass] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();


  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(firstname, lastname, email, password, repeatpass))
        .then(() => {
          setSuccessful(true);
          dispatch(login(email, password))
          .then(() => {
            props.history.push("/");
            window.location.reload();
          }) 
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  }

  if (message==="Network Error") {
    window.location.reload();
  }

  return (
    <>
      <MiniNavbar props={"Register"}/>

      <div className="auth bg-gradient-primary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                    <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
                        <div className="col-lg-7">
                        <div className="p-5">
                        <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                        </div>
                        <Form className="user" onSubmit={handleRegister} ref={form}>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <Input type="text" 
                                          className="form-control form-control-user" 
                                          placeholder="First Name"
                                          name="firstname"
                                          value={firstname}
                                          onChange={(e)=>setFirstname(e.target.value)}
                                          validations={[required]}/>
                                    </div>
                                    <div className="col-sm-6">
                                        <Input type="text" 
                                          className="form-control form-control-user" 
                                          placeholder="Last Name"
                                          name="lastname"
                                          value={lastname}
                                          onChange={(e)=>setLastname(e.target.value)}
                                          validations={[required]}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                        <Input
                                          type="text"
                                          className="form-control form-control-user"
                                          placeholder="Email Address"
                                          name="email"
                                          value={email}
                                          onChange={(e)=>setEmail(e.target.value)}
                                          validations={[required, validEmail]}
                                        />
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                        <Input
                                              type="password"
                                              className="form-control form-control-user"
                                              placeholder="Password"
                                              name="password"
                                              value={password}
                                              onChange={(e)=>setPassword(e.target.value)}
                                              validations={[required, vpassword]}
                                            />
                                    </div>
                                    <div className="col-sm-6">
                                        <Input
                                              type="password"
                                              className="form-control form-control-user"
                                              placeholder="Repeat Password"
                                              name="repeatpass"
                                              value={repeatpass}
                                              onChange={(e)=>setRepeatpass(e.target.value)}
                                              validations={[required, vpassword]}
                                            />
                                    </div>
                                </div>
                                <div className="form-group">
                                  <button className="btn btn-primary btn-user btn-block">Register Account</button>
                                </div>
                                {message && (
                                  <div className="form-group">
                                    <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                                      {message}
                                    </div>
                                  </div>
                                )}
                                <CheckButton style={{ display: "none" }} ref={checkBtn} />
                            </Form>
                            <hr/>
                            <div className="text-center">
                                <a className="small" href="forgot-password.html">Forgot Password?</a>
                            </div>
                            <div className="text-center">
                                  <Link className="small" to={"/login"}>Already have an account? Login!</Link>
                              </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
          </div>
        </div>
          </div>
    </div>
    </>
  );
};

export default Register;
