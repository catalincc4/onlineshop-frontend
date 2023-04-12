import React from 'react'
import './Payment.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


export default function PayPage() {
    const history = useHistory();
    const [quantities, setQuantites] = useState();
    const [userConnected, setUserConected] = useState({
        id:0,
        firstName: "",
        lastName: "",
        email:"nu",
        password: "",
        userType: "guest"
      });

      const [shoppingCart, setShopingCart] = useState(
        {id: 0,
        user: "",
        products : []
      } 
      );
      useEffect(() => {
        if(userConnected.userType === "CLIENT"){
      loadShopingCart();
        }
      }, [userConnected]);

      const loadShopingCart = async() =>{
        const result = await axios.post("http://localhost:8080/shoppingcart/user", userConnected);
        setShopingCart(result.data.shoppingCart);
        setQuantites(result.data.list);
      } ;

      useEffect(() => {
        loadUser();
        console.log(userConnected);
      }, []);

      const loadUser = () => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUserConected(foundUser);
        }
      };

      const [paytype, setPayType] = useState("CARD");

const pay = async(e) => {

    e.preventDefault()
     const result  = await axios.post("http://localhost:8080/pay", shoppingCart);
     console.log(result.data);
     history.push('/');
};




  return (

    

<body className='body1'>
  <form className='form1' >
  <label className ='label1'>
        <span className='span1'>SHIP METHOD</span>
        <select name="paytype" id="address-country" className="field1" onInput={(e) => setPayType(e.target.value)}>
          <option value="CARD" selected>CARD</option>
          <option value="RA">RAMBURS</option>
        </select>

      </label>
 {paytype === "CARD" &&
 <div>
    <input  name="token" />
    <div className="group1">
      <label className ='label1'>
        <span className='span1'>Card</span>
        <div id="card-element" className="field"></div>
      </label>
    </div>
    </div>
}
    <div className="group1">
      <label className ='label1'>
        <span className='span1'>First name</span>
        <input id="first-name" name="first-name" className="field1" placeholder="Manoj" />
      </label>
      <label className ='label1'>
        <span className='span1'>Last name</span>
        <input id="last-name" name="last-name" className="field1" placeholder="Halugona" />
      </label>
    </div>
    <div className="group1">
      <label className ='label1'>
        <span className='span1'>Address</span>
        <input id="address-line1" name="address_line1" className="field1" placeholder="77 Winchester Lane" />
      </label>
      <label className ='label1'>
        <span className='span1'>Address (cont.)</span>
        <input id="address-line2" name="address_line2" className="field1" placeholder="" />
      </label>
      <label className ='label1'>
        <span className='span1'>City</span>
        <input id="address-city" name="address_city" className="field1" placeholder="Coachella" />
      </label>
      <label className ='label1'>
        <span className='span1'>State</span>
        <input id="address-state" name="address_state" className="field1" placeholder="SA" />
      </label>
      <label className ='label1'>
        <span className='span1'>ZIP</span>
        <input id="address-zip" name="address_zip" className="field1" placeholder="92236" />
      </label>
      <label className ='label1'>
        <span className='span1'>Country</span>
        <select name="address_country" id="address-country" className="field1">
          <option value="RO" selected>ROMANIA</option>
          <option value="HU">UNGARIA</option>
          <option value="UC">UCRAINA</option>
          <option value="BG">BULGARIA</option>

        </select>
      </label>
    </div>
    <button className ='button1' type="button" onClick={(e) => pay(e)}>Pay</button>
    <div className="outcome1">
      <div className="error1"></div>
      <div className="success1">
        Success! Your Stripe token is <span className="token1"></span>
      </div>
    </div>
  </form>
</body>
  )
}
