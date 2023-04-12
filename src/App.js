
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import '../node_modules/react-dialog-confirm/build/index.css'; 
import Home from './pages/Home';
import ShopingCart from './pages/ShopingCart';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Switch}  from 'react-router-dom';
import Login from './pages/Login';
import RegistrePage from './pages/RegistrePage';
import AddProductPage from './pages/AddProductPage';
import AdminPage from './pages/AdminPage';
import SupplierPage from './pages/SupplierPage';
import EditProductPage from './pages/EditProductPage';
import PayPage from './pages/PayPage';
import EmployeePage from './pages/EmployeePage';
import OrdersPage from './pages/OrdersPage';


function App() {
  
  return (
    <Router>
    <div className="App">
     <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route exact path="/cart">
        <ShopingCart/>
      </Route>
      <Route exact path="/registre">
        <RegistrePage/>
      </Route>
      <Route exact path="/addProduct">
        <AddProductPage/>
      </Route>

      <Route exact path="/admin">
        <AdminPage/>
      </Route>

      <Route exact path="/supplier">
        <SupplierPage/>
      </Route>
      <Route exact path="/employee">
        <EmployeePage/>
      </Route>

      <Route exact path="/editProduct:id">
        <EditProductPage/>
      </Route>

      <Route exact path="/pay">
        <PayPage/>
      </Route>
      <Route exact path="/order">
        <OrdersPage/>
      </Route>

     </Switch>
    </div>
    </Router>
  );
}


export default App;
