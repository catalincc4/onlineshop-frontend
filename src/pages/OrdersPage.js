import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link, useHistory } from 'react-router-dom'

export default function OrdersPage() {
    const history = useHistory();
 
    const [userConnected, setUserConected] = useState({
        id:0,
        firstName: "",
        lastName: "",
        email:"nu",
        password: "",
        userType: "guest"
      });

      const [orders, setOrders] = useState([]);
    
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
        if(userConnected.type !== "guest"){
          loadOrders();
        }
    
      }, [userConnected]);
    
    
      const loadOrders = async () => {
        const result = await axios.put(`http://localhost:8080/orders/${userConnected.id}`);
        setOrders(result.data);
    };
    
    
     
      return (
        <div>
          <body>
            <nav className='navbar navbar-dark navbar-expand-md sticky-top py-3 nav-dark' id="mainNav">
              <div className="container">
                <span>
                    <Link className="btn btn-danger" to = "/">Back</Link>
                </span>
              </div>
            </nav>
            <div className="container">
              <div className="py-4">
                <table className="table border shadow">
                  <thead>
                    <tr>
                      <th scope="col">S.N</th>
                      <th scope="col">User Details</th>
                      <th scope="col">Products</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr>
                        <th scope="row" key={index}>
                          {index + 1}
                        </th>
                        <td>{order.user.firstName + " " + order.user.lastName}</td>
                        <td>{order.names}</td>
                        <td>{order.status}</td>
                       
                    
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