import React from "react";
//import { Link } from "react-router-dom";

function Products() {

const products = [
  {name: "iPhone 13", price: 999.99, src: "https://m.media-amazon.com/images/I/61IJBsHm97L.jpg"},
  {name: "NBA Authenic Indoor Competition Basketball", price: 59.95, src: "https://www.wilson.com/en-us/media/catalog/product/7/0/70f35a99-0244-4733-8ab5-5e63f9b5ff3f_0swxicjpjy1meugf.png?dpr=3&fit=bounds&orient=1&quality=70&optimize=medium&format=jpg&auto=webp&enable=upscale&width=778&height=950&canvas=2334%2C2850&bg-color=f5f5f5"},
  {name: "Marvel's Guardians of the Galaxy", price: 59.95, src: "https://images-na.ssl-images-amazon.com/images/I/81PlWkN5lwL.jpg"},
  {name: "Men's Minnesota Vikings New Era Purple Field Patch 59FIFTY Fitted Hat", price: 41.99, src: "https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_4187000/altimages/ff_4187381-8f686a4fd67faf121160alt1_full.jpg&w=900"}
]

  return (
    <div>
      <h1>Our Products</h1>
      <div className = "row">
        {products.map(function(product, index) {
          return <div key = {index} className = "products col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <div className="card">
              <img className="card-img-top" src={product.src} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
              </div>
              <p className="card-text">{product.price}</p>
              <a href="#" className="btn btn-primary">View Product</a>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default Products;