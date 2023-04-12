import './ShopingCart.css';
import { useState } from 'react';


const ProductPage = ({products, addToCart}) => {



      return ( <body className="bodyShoppingCart">
     <div class="container">
     <h4 className="paragraf" >Products</h4>
     {products.map((product, index) =>(
      <div class="row" key = {index}>
     
              <div class="shadow-sm card mb-3 product">
                <img class="product-img" src={"data:image/jpg;base64," + product.image}/>
                <div class="card-body">
                  <h5 class="card-title text-info bold product-name">{product.name}</h5>
                  <p class="card-text text-success product-price">{product.price} RON</p>
                  <button class="btnCart badge badge-pill badge-secondary mt-2 float-right" type="button" onClick={() => addToCart(product)} >Add to cart</button>
                </div>
              </div>
            </div>
        
             )
             )}
          </div>
      </body>);


}

export default ProductPage;