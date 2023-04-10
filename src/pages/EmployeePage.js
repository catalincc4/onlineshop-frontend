import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link, useHistory } from 'react-router-dom'
export default function EmployeePage() {
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
          loadOrders();
        }
    
      }, [userConnected]);
    
    
      const loadOrders = async () => {
        const result = await axios.get("http://localhost:8080/orders");
        setOrders(result.data);
    };
    
      
      const handleEdit = async(order) => {
         await axios.put(`http://localhost:8080/order/${order.id}`, order);
         loadOrders();
      };
    
     
      return (
        <div>
          <body>
            <nav className='navbar navbar-dark navbar-expand-md sticky-top py-3 nav-dark' id="mainNav">
              <div className="container">
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
                      <th scope="col">User Details</th>
                      <th scope="col">Products</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
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
                        <td>
                         { order.status === "PROCESSING" &&
                          <span>
                            <button
                              className="btn btn-secondary mx-2"
                              onClick={() => handleEdit(order)}
                            >
                             SEND TO SHIP
                            </button>
                          </span>}

                          { order.status === "SHIPPING" &&
                          <span>
                            <button
                              className="btn btn-success mx-2"
                              onClick={() => handleEdit(order)}
                            >
                             FINISH ORDER
                            </button>
                          </span>}

                          {
                            order.status === "DONE" &&
                            <h2>DONE</h2>
                          }
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