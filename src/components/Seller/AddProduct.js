import React, { useEffect, useState } from 'react'
import {ImPlus,ImMinus} from 'react-icons/im'
import {FaClipboardList} from'react-icons/fa'
import {Link, useHistory} from 'react-router-dom';
import Topbar from './Topbar';
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../actions/product";

import ProductImage from '../../assets/images/productimage.png';
import Sidebar from './Sidebar';

import {Modal,Button} from 'react-bootstrap';


function AddProduct() {

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState();

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState();

    const { message } = useSelector(state => state.message);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        history.push("/seller/product");
        window.location.reload();
    };
    const handleShow = () => setShow(true);
    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {

        if (!selectedFile) {
            setImage(ProductImage)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setImage(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])


    useEffect(()=>{
        modal();
    })


    const onSelectFile = (e) => {
        // setImage(e.target.files[0]);
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0]);
    }

    const _Quantity = (Op) => {
        if(Op==="+"&&quantity!==""){
            setQuantity(parseInt(quantity)+1);
        }
        if(Op==="-"&&quantity>=1){
            setQuantity(quantity-1);
        }
    }

    const handleCreate =(e) => {
        e.preventDefault();




        const formData = new FormData();
        formData.append("name",name)
        formData.append("description",description)
        formData.append("quantity",quantity)
        formData.append("price",price)
        formData.append("image",selectedFile);

        setLoading(true);

        dispatch(createProduct(formData))
        .then(()=>{
            
        })
        .catch(() => {
            setLoading(false);
        });
    }
    const modal = () =>{
        if(message!==undefined || message===''){
            handleShow();
        }
    }


    return (
        <>
                      <div id="page-top">
        <div id="wrapper">
          <Sidebar state={"product"}/>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              {/* <Topbar/> */}
        <Topbar Title={"Add Product"}/>
          <div className="container-fluid">
            <div className="col-sm-3 d-sm-flex align-items-center justify-content-between' mb-2">
              <Link to={"/seller/product"} className="btn btn-success btn-icon-split shadow">
                <span className="icon text-white-50">
                <FaClipboardList/>
                </span>
                <span className="text">View Product</span>
              </Link>
            </div>


            {/* <!-- Content Row --> */}
            <div className="card mb-4 py-3 border-left-success border-bottom-success shadow">
                <div className="card-body">
                <div className="container">
                <div className="row">
                    <div className="col-sm-8 mt-4 order-1">
                        <form onSubmit={handleCreate}>
                            <div className="form-group">
                                <label>Product Name</label>
                                <input type="text" 
                                    className="form-control" 
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label>Product Description</label>
                                <textarea className="form-control"rows="3" 
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e)=>setDescription(e.target.value)}/>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-6 mb-3 mb-sm-0">
                                    <label>Product Quantity</label>
                                    <div className="input-group">
                                    <div className="input-group-prepend">
                                        <i className="btn btn-outline-secondary" 
                                        type="button"
                                        onClick={()=>_Quantity("-")}
                                        ><ImMinus/></i>
                                    </div>
                                    <input type="number" 
                                        className="form-control"  
                                        min="0"
                                        value={quantity}
                                        onChange={(e)=>setQuantity(e.target.value)}/>
                                    <div className="input-group-append">
                                        <i className="btn btn-outline-secondary" 
                                        type="button"
                                        onClick={()=>_Quantity("+")}
                                        ><ImPlus/></i>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Product Price</label>
                                        <input type="number" 
                                            className="form-control"
                                            min="0"
                                            value={price}
                                            onChange={(e)=>setPrice(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label >Product Picture</label>
                                <input type="file" name="image" accept="image/*" multiple={false} onChange={onSelectFile} className="form-control-file border"/>
                            </div>
                            <button className="btn btn-primary btn-block" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Submit</span>
                            </button>
                        </form>
                    </div>

                <div className="col-xl-4 col-md-6 mb-4 order-2 d-flex align-items-center">
                <div className="card mt-8 d-flex align-items-center shadow">
                    <img className="img-thumbnail" 
                    src={image}
                    alt="product"/>
                </div>
              </div>
                </div>
        
                </div>
                </div>
            </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div> 
        </div>
        </div>
      </div>
      </div>
        </>
    )
}

export default AddProduct
