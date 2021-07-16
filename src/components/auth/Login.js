import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import {Link} from'react-router-dom';
import { isEmail } from "validator";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import MiniNavbar from "../layout/MiniNavbar";

import { login } from "../../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div classNameName="alert alert-danger" role="alert">
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

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();



  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(email, password))
        .then(() => {
          props.history.push("/");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };


  if (message==="Network Error") {
    window.location.reload();
  }




  return (
    <>
    <MiniNavbar props={"Login"}/>
    <div className="auth bg-gradient-primary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-6 d-none d-lg-block bg-login-image">
                        </div>
                        <div className="col-lg-6">
                        <div className="p-5">
                          <div className="text-center">
                              <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                            </div>
                            <Form className="user" onSubmit={handleLogin} ref={form}>
                                <div className="form-group-floating">
                                    <Input type="text" 
                                      className="form-control form-control-user"
                                      name="username"
                                      placeholder="Enter Email"
                                      value={email}
                                      onChange={(e)=>setEmail(e.target.value)}
                                      validations={[required,validEmail]}
                                      />
                                </div>
                                <div className="form-group-floating">
                                      <Input
                                      type="password"
                                      className="form-control form-control-user"
                                      name="password"
                                      placeholder="Enter Password"
                                      value={password}
                                      onChange={(e)=>setPassword(e.target.value)}
                                      validations={[required]}
                                    />
                                </div>
                                <div className="form-group">
                                <button className="btn btn-primary btn-user btn-block" disabled={loading}>
                                  {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                  )}
                                  <span>Login</span>
                                </button>
                              </div>

                              {message && (
                                <div className="form-group">
                                  <div className="alert alert-danger" role="alert">
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
                                  <Link className="small" to={"/register"}>Create an Account!</Link>
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

export default Login;
