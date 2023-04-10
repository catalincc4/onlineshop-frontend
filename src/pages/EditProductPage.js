import axios from "axios";
import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';



export default function EditProductPage() {
  const history = useHistory();

  const {id} = useParams();
  const [imageData, setImageData] = useState();

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    image: "",
    quantity: 0,
    category:"Select category"
  });

  const [image1, setImage1] = useState();

  const { name, price, image, quantity, category} = product;

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };


  function handleChange(e) {
    let data = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
        let file = e.target.files[i];
        data.append("file" + i, file, file.name);
    }

    setImageData(data);
    setImage1(URL.createObjectURL(e.target.files[0]));

}

const setCategory = (n) =>{
    setProduct({ ...product, ['category']: n });
}

  const onSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: { 'content-type': 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p' }
  };
    axios.post("http://localhost:8080/upload-files", imageData, config);
    await axios.put(`http://localhost:8080/edit/product/${id}`, product);
    history.go(-1);
  };

  const loadProduct = async()=>{
    const result =  await axios.get(`http://localhost:8080/product/${id}`);
    setProduct(result.data);
    setImage1(URL.createObjectURL(product.image));
  }

   const goBack = () =>
   {
    history.push('/supplier');
   };

   useEffect(()=>{
    loadProduct();
   },[])

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit product</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Product Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter product name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter price"
                name="price"
                value={price}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="quantity"
                value={quantity}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <DropdownButton id="dropdown-basic-button" title={category}>
                    <Dropdown.Item onClick= {() => setCategory("IT")}>IT</Dropdown.Item>
                   <Dropdown.Item onClick= {() => setCategory("SPORT")}>SPORT</Dropdown.Item>
                  <Dropdown.Item onClick= {() => setCategory("FURNITURE")}>FURNITURE</Dropdown.Item>
                  <Dropdown.Item onClick= {() => setCategory("TOYS")}>TOYS</Dropdown.Item>
                </DropdownButton>
     
              </div>



            <div className="mb-3">
              <label htmlFor="img" className="form-label">
                Image
              </label>
              
               <input class="form-control form-control-lg"  type="file" 
                name="image"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-3">
            <img className ="card-image" src={image1}></img>
            </div>
            <button type="submit" className="btn btn-outline-primary" onClick = {onSubmit}>
              Submit
            </button>
            <button className="btn btn-outline-danger mx-2" onClick ={goBack}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
