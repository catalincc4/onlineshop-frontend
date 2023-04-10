import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link, useHistory } from 'react-router-dom'

export default function SupplierPage() {
  const [category, setCategory] = useState("Select category");
  const [inputSearch, setInputSearch] = useState("");
  const history = useHistory();
  const [products, setProducts] = useState([{
    id: 0,
    name: 'lapte',
    price: 0,
    quantity: 0,
    image: null,
    category: ''

  }]);

  const [productsD, setProductsD] = useState([{
    id: 0,
    name: 'lapte',
    price: 0,
    quantity: 0,
    image: "",
    category: ''

  }]);

  const [userConnected, setUserConected] = useState({
    id:0,
    firstName: "",
    lastName: "",
    email:"nu",
    password: "",
    userType: "guest"
  });

  const loadUser = () => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser);
      setUserConected(foundUser);
    }
  };


  function logOut(){
    console.log("aici");
    localStorage.clear();
    history.push('/login');
  }



  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if(userConnected.type !== "guest"){
      loadProducts();
    }

  }, [userConnected]);


  const loadProducts = async () => {
    const result = await axios.post("http://localhost:8080/supplierproducts/user", userConnected);
    setProducts(result.data);
    setProductsD(result.data);
  };

  const handleDelete = async(id) => { 
    await axios.delete(`http://localhost:8080/delete/product/${id}`);
    loadProducts();
   };

  
  const handleEdit = (id) => { 
    history.push(`/editProduct${id}`);
  };

  const displayProducts = (cat) => {
       setCategory(cat);
        if (cat === "."){
           setProductsD(products);
           setCategory('Select product category');
        }
        if(cat === "IT"){
            setProductsD(products.filter((product) => product.category === 'IT'));
        }
        if(cat === "SPORT"){
          setProductsD(products.filter((product) => product.category === 'SPORT'));
      }
      if(cat === "FURNITURE"){
        setProductsD(products.filter((product) => product.category === 'FURNITURE'));
    }
    if(cat === "TOYS"){
      setProductsD(products.filter((product) => product.category === 'TOYS'));
  }}

  const onInputChange = (e) => {
    setInputSearch(e.target.value);
 };

 function performSearch(){
  setProductsD(productsD.filter((product) => product.name.includes(inputSearch)));
 }

  return (
    <div>
      <body>
        <nav className='navbar navbar-dark navbar-expand-md sticky-top py-3 nav-dark' id="mainNav">
          <span>
            <Link className='btn btn-secondary' to="/addProduct"> Add Product</Link> 
          </span>
          <div className="container">
            <DropdownButton id="dropdown-basic-button" title={category}>
             <Dropdown.Item onClick={() => displayProducts('.')}>..</Dropdown.Item>
              <Dropdown.Item onClick={() => displayProducts("IT")}>IT</Dropdown.Item>
              <Dropdown.Item onClick={() => displayProducts("SPORT")}>SPORT</Dropdown.Item>
              <Dropdown.Item onClick={() => displayProducts("FURNITURE")}>FURNITURE</Dropdown.Item>
              <Dropdown.Item onClick={() => displayProducts("TOYS")}>TOYS</Dropdown.Item>
            </DropdownButton>
            <span className='input-group'>
              <div className="input-group">
                <input className="form-control" type="text"                 
                name="name"
                value={inputSearch}
                onChange={(e) => onInputChange(e)}></input>
                <button className="btn btn-primary" type="button" onClick = {() => performSearch()}>Search</button>
              </div>
            </span>
            <span>
                <button className="btn btn-danger" type='button' onClick={() => logOut()}>LogOut</button>
            </span>
          </div>
        </nav>
        <div className="container">
          <div className="py-4">
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">S.N</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {productsD.map((product, index) => (
                  <tr>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td><img className='card-image2' src={"data:image/jpg;base64," + product.image}></img></td>
                    <td>{product.name}</td>
                    <td>{product.price} RON</td>
                    <td>{product.quantity}</td>
                    <td>

                      <span>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </span>

                      <span>
                        <button
                          className="btn btn-secondary mx-2"
                          onClick={() => handleEdit(product.id)}
                        >
                         Edit
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </div>
  )
}
