import React, { Component } from "react";
import '../dbTemp/products'
import productsList from "../dbTemp/products";
import '../Assets/CSS/Product.css'

class Product extends Component{

  render(){

    const { codeNumber } = this.props;
    const productId = parseInt(codeNumber);
    const product = productsList.find(product => product.id === productId);

    //Vista productos
    const ProductCard = ({ product }) => {
      return <div className="product">
          <div className="left" style={{ backgroundImage: `url(${product.imgURL})` }}>
          </div>
          <div className="right">
              <h5>{product.name}</h5>
              <p>{product.marca}</p>
              <p>{product.description}</p>
              <p> <strong>Precio:</strong> {product.price}</p>
              <p> <strong>Cantidad:</strong> {product.cantidad}</p>
          </div>
      </div>
    }

    
    return(
      <React.Fragment>
        
        {/* <div className="products">
            {productsList.map(prod => (
                <ProductCard product={prod} key={prod.id} />
            ))}
        </div> */}

        {product ? (
          <div className="products">
            <ProductCard product={product} key={product.id} />
          </div>
        ) : (
          <label style={{ color: "red", display: "block", margin: "10px", textAlign:"center"}}> No se encontró el producto </label>
        )}

      </React.Fragment>
    );
  }

}

export default Product;