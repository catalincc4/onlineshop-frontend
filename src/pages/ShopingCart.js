import { useState, useEffect} from 'react'
import './ShopingCart.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ShopingCart(){

  const [quantities, setQuantites] = useState();

  const [userConnected, setUserConected] = useState({
    id:0,
    firstName: "",
    lastName: "",
    email:"nu",
    password: "",
    userType: "guest"
  });

 

  useEffect(() => {
    loadUser();
    console.log(userConnected);
  }, []);

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

  const loadUser = () => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserConected(foundUser);
    }
  };

  useEffect(() => {
   setItems(shoppingCart.products);
  }, [shoppingCart]);

  const [itemsList, setItems] = useState([]);
  const [totalAmount, setAmount] = useState(0);
    

  const increase = async(item) => {
        const result = await axios.put(`http://localhost:8080/edit/shoppingcart/${shoppingCart.id}`, item);
        loadShopingCart();
    

  }

  const decrease = async(item) => {
     const result = await axios.put(`http://localhost:8080/cart/decrease/${shoppingCart.id}`, item);
     loadShopingCart();
 }


  const remove = async(item) => {
       const result = await axios.put(`http://localhost:8080/cart/remove/${shoppingCart.id}`, item);
       loadShopingCart();
  }

  const deletAll = async() =>{
    await axios.put(`http://localhost:8080/cart/clear/${shoppingCart.id}`);
    setItems([]);
  }
  
  function amount(items){
    let sum = 0;
    for(let i = 0; i < items.length; i++){
      sum = sum + items.at(i).price * quantities.at(i); 
    }
    return sum;
  }
  useEffect(() => {
    setAmount(amount(itemsList));
  }, [itemsList]);

   


  return (
    <body className='bodyShoppingCart'>
      <div className="flex-centre">
        <h4 className="badge-pill badge-light text-center" style ={{color: "blue"}}>Cart</h4>
        <div className="cart">
         
          {itemsList.map((product, index) => (
            <div >
              <div  key={index}  className="d-flex flex-row shadow-sm card cart-items mt-2 mb-3 animated flipInX">
              <div class="p-2">
                  <img className='card-image2' src={"data:image/jpg;base64," + product.image} alt={product.name} />
                  </div>
                  <div class="p-2 mt-3">
                  <p className="text-info cart_item_name">{product.name}</p>
                  </div>
                  <div class="p-2 mt-3">
                  <p className="cart_item_price text-success">{quantities.at(index)*product.price}</p>
                  </div>
                  <div className="d-flex flex-row shadow-sm card cart-items mt-2 mb-3 animated flipInX">
                <div className="p-2 mt-3 ml-auto">
                  <button className="btnCartI badge badge-secondary" type="button"  onClick={() => increase(product)}>+</button>
                </div>
                <div className="p-2 mt-3">
                  <p className="text-success cart_item_quantity">{quantities.at(index)}</p>
                </div>
                <div className="p-2 mt-3">
                  <button className="btnCart badge badge-info" type="button" onClick={() => decrease(product)}>-</button>
                </div>
                <div className="p-2 mt-3">
                  <button className="btnCart badge badge-danger" type="button" onClick={() => remove(product)}>Remove</button>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div class="d-flex flex-row shadow-sm card cart-footer animated flipInX text-centre">
        <div class="p-2">
          <button class="btnCart badge-danger" type="button" data-action="clear-cart" onClick={() =>deletAll()}>Clear Cart</button>
        </div>
        <div class="p-2 ml-auto">
          <Link class="btnCartI badge-dark" to='/pay'>Pay</Link>
          <span class="pay">{"Total amount: "}{totalAmount} {" RON"}</span>
        </div>
      </div>

    </body>
  );
}

export default ShopingCart;




