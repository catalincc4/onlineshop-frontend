import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link, useHistory } from 'react-router-dom'

export default function AdminPage() {
  const [userConnected, setUserConected] = useState({
    id:0,
    firstName: "",
    lastName: "",
    email:"nu",
    password: "",
    userType: "guest"
  });

  const history = useHistory();


   const [category, setCategory] = useState("Select category");
   const [onProductPage, setOnProductPage] = useState(true);
   const [users, setUsers] = useState([{
    id: 0,
    firstName:'Calin',
    lastName: 'Catalin',
    email: 'calincatalin99@gmail.com',
    password: '-',
    userType:'Admin'
   }]);

   const [usersD, setUsersD] = useState([{
    id: 0,
    firstName:'Calin',
    lastName: 'Catalin',
    email: 'calincatalin99@gmail.com',
    password: '-',
    userType:'Admin'
   }]);

   const [products, setProducts] = useState([{
    id: 0,
    name: 'lapte',
    price: 0,
    quantity: 0,
    image: "/9j/4QzCRXhpZgAATU0AKgAAAAgADAEAAAMAAAABAfQAAAEBAAMAAAABA58AAAECAAMAAAADAAAAngEGAAMAAAABAAIAAAESAAMAAAABAAEAAAEVAAMAAAABAAMAAAEaAAUAAAABAAAApAEbAAUAAAABAAAArAEoAAMAAAABAAIAAAExAAIAAAAeAAAAtAEyAAIAAAAUAAAA0odpAAQAAAABAAAA6AAAASAACAAIAAgAHUwAAAAnEAAdTAAAACcQQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykAMjAyMjowOTowOCAxMDowNzo1OQAAAAAEkAAABwAAAAQw",
    category: ''

   }]);

   const [inputSearch, setInputSearch] = useState("");

   const [productsD, setProductsD] = useState([{
    id: 0,
    name: 'lapte',
    price: 0,
    quantity: 0,
    image: "",
    category: ''

  }]);
   
   useEffect(() =>{
    loadUsers();
    loadProducts();
    loadUser();
   }, []);
    
   const loadUsers = async() =>{
       const result = await axios.get("http://localhost:8080/users");
       setUsers(result.data);
       setUsersD(result.data);
       console.log(result);
   };

   const loadProducts = async() =>{
    const result = await axios.get("http://localhost:8080/products");
    setProducts(result.data);
    setProductsD(result.data);
    console.log(result);
   };

   const handleClick = () => {
      setOnProductPage(false);
   };

   const handleClick1 = () => {
    setOnProductPage(true);
 };

 const logOut=() => {
  setUserConected({
    id:0,
    firstName: "",
    lastName: "",
    email:"nu",
    password: "",
    userType: "guest"
  });
  localStorage.clear();
  history.push('/login');
};

const loadUser = () => {
  const loggedInUser = localStorage.getItem("user");
  console.log(loggedInUser);
  if (loggedInUser) {
    const foundUser = JSON.parse(loggedInUser);
    setUserConected(foundUser);
  }
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

function performSearch(){
  setProductsD(productsD.filter((product) => product.name.includes(inputSearch)));
  
  setUsersD(usersD.filter((user) => user.firstName.includes(inputSearch)));
  if(inputSearch === ""){
    setProductsD(products);
    setUsersD(users);
  }
 }

 const onInputChange = (e) => {
  setInputSearch(e.target.value);
};

 function dropdown(on){

    if(on){
        return ( <DropdownButton id="dropdown-basic-button" title={category}>
        <Dropdown.Item onClick={() => displayProducts('.')}>..</Dropdown.Item>
         <Dropdown.Item onClick={() => displayProducts("IT")}>IT</Dropdown.Item>
         <Dropdown.Item onClick={() => displayProducts("SPORT")}>SPORT</Dropdown.Item>
         <Dropdown.Item onClick={() => displayProducts("FURNITURE")}>FURNITURE</Dropdown.Item>
         <Dropdown.Item onClick={() => displayProducts("TOYS")}>TOYS</Dropdown.Item>
       </DropdownButton>);
}};

    function display(on){
       if(!on){
        return (
          <div className="container">
          <div className="py-4">
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">S.N</th>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {usersD.map((user, index) => (
                  <tr>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.userType}</td>
                    <td>
                      {user.userType !== 'ADMIN' && 
                        <div>
                       <button
                        className="btn btn-danger mx-2"
                         onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                        </div>
       }
            
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        );
       }else{
        return (
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
                         onClick={() => handleDelete1(product.id)}
                      >
                        Delete
                      </button>
                        </span>       
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        );
       }

    }


    const handleDelete= async(id) =>{
       await axios.delete(`http://localhost:8080/user/delete/${id}`);
    };

    const handleDelete1= async(id) =>{
      await axios.delete(`http://localhost:8080/delete/product/${id}`);
   };
    

  return (
    <div>
      <body>
        <nav className='navbar navbar-dark navbar-expand-md sticky-top py-3 nav-dark' id="mainNav">
          <span >
            <button className='btn btn-primary' onClick= {() => handleClick()}>Users</button>
          </span>
          <span>
            <button className='btn btn-primary' onClick= {() => handleClick1()}>Products</button>
          </span>
          
          <div className="container">
          {
            dropdown(onProductPage)
           }
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
            <div className="btn-group">
              <button className="btn btn-danger" onClick={() => logOut()}>LogOut</button>
            </div>
          </span>
        </div>
      </nav>
        {display(onProductPage)}
    </body>
 </div>
  )
}
