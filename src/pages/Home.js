
import React from 'react'
import BasicButtonExample from '../layout/Dropdown'
import Button from '../layout/Button'
import ProductPage from '../pages/ProductPage'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import ShopingCart from './ShopingCart'

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


export default function Home() {

  const [productsD, setProductsD] = useState([{
    id: 0,
    name: 'lapte',
    price: 0,
    quantity: 0,
    image: "",
    category: ''

  }]);
  const [inputSearch, setInputSearch] = useState("");
  const [category, setCategory] = useState("Select category");

  const [userConnected, setUserConected] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "nu",
    password: "",
    userType: "guest"
  });
  const [products, setProducts] = useState([{
    id: 0,
    name: 'lapte',
    price: 0,
    quantity: 0,
    image: "/9j/4QzCRXhpZgAATU0AKgAAAAgADAEAAAMAAAABAfQAAAEBAAMAAAABA58AAAECAAMAAAADAAAAngEGAAMAAAABAAIAAAESAAMAAAABAAEAAAEVAAMAAAABAAMAAAEaAAUAAAABAAAApAEbAAUAAAABAAAArAEoAAMAAAABAAIAAAExAAIAAAAeAAAAtAEyAAIAAAAUAAAA0odpAAQAAAABAAAA6AAAASAACAAIAAgAHUwAAAAnEAAdTAAAACcQQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykAMjAyMjowOTowOCAxMDowNzo1OQAAAAAEkAAABwAAAAQw",
    category: ''

  }]);
  const [numberOfProducts, setNumberOfProducts] = useState(0);

  useEffect(() => {
    loadProducts();
    loadUser();
    console.log(userConnected);
  }, []);

  const [shoppingCart, setShopingCart] = useState(
    {
      id: 0,
      user: "",
      products: []
    }
  );
  useEffect(() => {
    if (userConnected.userType === "CLIENT") {
      loadShopingCart();
    }
  }, [userConnected]);

  const loadShopingCart = async () => {
    const result = await axios.post("http://localhost:8080/shoppingcart/user", userConnected);
    setShopingCart(result.data.shoppingCart);
    console.log(result.data);
    const list = result.data.list;
    setNumberOfProducts(list.length);
  };

  const loadUser = () => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserConected(foundUser);
    }
  };

  const logOut = () => {
    setUserConected({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: "guest"
    });
    localStorage.clear();
  };

  const displayProducts = (cat) => {
    setCategory(cat);
    if (cat === ".") {
      setProductsD(products);
      setCategory('Select product category');
    }
    if (cat === "IT") {
      setProductsD(products.filter((product) => product.category === 'IT'));
    }
    if (cat === "SPORT") {
      setProductsD(products.filter((product) => product.category === 'SPORT'));
    }
    if (cat === "FURNITURE") {
      setProductsD(products.filter((product) => product.category === 'FURNITURE'));
    }
    if (cat === "TOYS") {
      setProductsD(products.filter((product) => product.category === 'TOYS'));
    }
  }

  const onInputChange = (e) => {
    setInputSearch(e.target.value);
  };

  function performSearch() {
    setProductsD(productsD.filter((product) => product.name.includes(inputSearch)));
  }


  const loadProducts = async () => {
    const result = await axios.get("http://localhost:8080/products");
    setProducts(result.data);
    setProductsD(result.data);
  }

  const addToCart = async (product) => {
    if (userConnected.userType === "CLIENT") {
      await axios.put(`http://localhost:8080/edit/shoppingcart/${shoppingCart.id}`, product);
      setNumberOfProducts(numberOfProducts + 1);
    }
  };

  return (
    <div>
      <body>
       
        <nav className='navbar navbar-dark navbar-expand-md sticky-top py-3 nav-dark' id="mainNav">
        <h4>Magazin mixt online</h4>
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
                <button className="btn btn-primary" type="button" onClick={() => performSearch()}>Search</button>
              </div>
            </span>
            <span>
              {userConnected.userType === "CLIENT" &&
                <Link to="/cart">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
                    <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                  </svg>
                  <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                    style={{
                      color: "white",
                      width: "1.5rem",
                      height: "1.5rem",
                      bottom: 0,
                    }}
                  >
                    {numberOfProducts}
                  </div>
                </Link>}
            </span>
            {userConnected.userType === "CLIENT" &&
            <Link  to='/order'>
            <span className='ship'>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-truck-delivery" width="40" height="40" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <circle cx="7" cy="17" r="2" /> <circle cx="17" cy="17" r="2" /> <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" /> <line x1="3" y1="9" x2="7" y2="9" /> </svg>
            </span>
            </Link>
            }
            <span>
              {userConnected.userType === "guest" &&
                <div className="btn-group">
                  <Link className="btn btn-primary" to="/login">LogIn</Link>
                </div>}
              {userConnected.userType !== "guest" &&
                <div className="btn-group">
                  <button className="btn btn-primary" onClick={() => logOut()}>LogOut</button>
                </div>
              }
            </span>
          </div>
        </nav>
        <ProductPage products={productsD} addToCart={addToCart}></ProductPage>
      </body>
    </div >
  )
}
