/*

PAGE WORKED ON BY MATTHEW VARGAS 

*/

import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

let debouncing = null;

function debounce(callback) {
  if (debouncing) {
    console.log("too fast canceling");
    clearTimeout(debouncing);
  }

  debouncing = setTimeout(() => {
    console.log("enough time, running it");
    debouncing = null;
    callback();
  }, 300);
}

function Products() {
  const [query, setQuery] = useState("");
  const [products, setState] = useState([]);
  const inputRef = useRef();

  const onChangeQuery = (evt) => {
    console.log("query: ", evt.target.value);
    // if (evt.keyPressed ==="enter")
    setQuery(evt.target.value);
  };
  /*
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch(`/api/products`);
        const json = await response.json();
        console.log(json);
        setState(json.data)
      } catch (e) {
        console.log("Error: ", e);
      }
    };

    fetchData();
  }, []);

*/

  useEffect(() => {
    const fetchData = async () => {
      // if (throttling.current) {
      //   console.log("throttling not doing anything");
      //   return;
      // }
      try {
        console.log("fetching data");
        // throttling.current = true;
        const queryUrl = `/api/products${query === "" ? "" : "/" + query}`;
        const response = await fetch(queryUrl);
        const json = await response.json();
        // throttling.current = false;
        setState(json.data);
        // console.log("ending throttling");
      } catch (e) {
        console.log("Error: ", e);
      }
    };

    debounce(fetchData);
  }, [query]);

  return (
    <div>
      <h1 className="title">Our Products</h1>
      <div className="search-products row">
        <div className="col-12">
          <label htmlFor="search">Search Products by Name: </label>
          <input
            type="text"
            className="form-control"
            id="search"
            placeholder="search..."
            ref={inputRef}
            onChange={onChangeQuery}
            value={query}
          />
        </div>
      </div>
      <div className = "filter-products row">
        <div className = "col-12">
          <form>
            <div className = "col-3">
              <div className = "form-check">
                <input 
                  className = "form-check-input"
                  type = "checkbox"
                  value = "dog"
                  id = "Input-Check-Dog"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        {products.map(function (product, index) {
          return (
            <div
              key={index}
              className="products col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12"
            >
              <div className="card">
                <img
                  className="card-img-top"
                  src={product.src}
                  alt={`${product.name}`}
                />
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                </div>
                <p className="card-text">{product.price}</p>
                <Link
                  to={`/product/${product._id}`}
                  className="nav-link btn text-light"
                  aria-current="page"
                >
                  View Product
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
