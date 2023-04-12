import axios from "axios";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


export default function AddProductPage(){
  const history = useHistory();
  
  

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    image: null,
    quantity: 0,
    category:"Select category"
  });



   const [userConnected, setUserConected] = useState({
    id:0,
    firstName: "",
    lastName: "",
    email:"nu",
    password: "",
    userType: "guest"
  });

  const [supplier, setSupplier] = useState({
    id: 0,
    user: userConnected,
    products: []
  });
  

  const loadSupplier= async() =>{
    const result2 = await axios.get(`http://localhost:8080/supplier/user/${userConnected.id}`);
    setSupplier(result2.data);
  };
  const loadUser = () => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser);
      setUserConected(foundUser);
    }
  };

 useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if(userConnected.userType !== "guest"){
    loadSupplier();
  }
  }, [userConnected])

  const [imageData, setImageData] = useState();

  const { name, price, image, quantity, category} = product;

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  
  const [image1, setImage1] = useState("");

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
    console.log(product.category);
}

  const onSubmit = async (e) => {
    console.log(product.image);
    // loadSupplier();
    e.preventDefault();
    const config = {
      headers: { 'content-type': 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p' }
  };
  await axios.post("http://localhost:8080/upload-files", imageData, config);
  const result = await axios.post("http://localhost:8080/product", product);
  console.log(result);
  const result1 = await axios.put(`http://localhost:8080/edit/supplier/${supplier.id}`, result.data);
  console.log(result1);
  history.push('/supplier');
  };


   const goBack = () =>
   {
    history.go(-1);
   };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add product</h2>

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
            <button type="submit" className="btn btn-outline-primary">
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
