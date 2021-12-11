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
  //const [query, setQuery] = useState("");
  const [products, setState] = useState([]);
  const [filter, setFilter] = useState([]);
  //const inputRef = useRef();

  /*
  const onChangeQuery = (evt) => {
    console.log("query: ", evt.target.value);
    // if (evt.keyPressed ==="enter")
    setQuery(evt.target.value);
  };
  */

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
      try {
        console.log("fetching data");
        const queryUrl = `/api/products/filter${filter === "" ? "" : "?filter=" + filter}`;
        const response = await fetch(queryUrl);
        const json = await response.json();
        setState(json.data);
      } catch (e) {
        console.log("Error: ", e);
      }
    };

    debounce(fetchData);
  }, [filter]);

  function handleFilter(event) {
    event.preventDefault();
    const dog = document.getElementById("Input-Check-Dog");
    const cat = document.getElementById("Input-Check-Cat");
    const food = document.getElementById("Input-Check-Food");
    const toy = document.getElementById("Input-Check-Toy");
    const inputFilters = [dog, cat, food, toy];
    let filterOptions = []
    for(let i = 0; i < inputFilters.length; i++) {
      if (inputFilters[i].checked) {
        filterOptions.push(inputFilters[i].value);
      }
    }

    if(filterOptions.length === 0 || filterOptions.length === inputFilters.length) {
      filterOptions = [""];
    }

    setFilter(filterOptions);
  }

  /*
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
            readOnly
          />
        </div>
      </div>
  */

  return (
    <div>
      <h1 className="title">Our Products</h1>
      <div className = "filter-products row">
        <div className = "col-12">
          <form onSubmit={handleFilter}>
            <div className = "col-6 filter-boxes filter-boxes-left">
              <div className = "row">
                <div className = "col-1">
                  <div className = "form-check">
                    <input 
                      className = "form-check-input"
                      type = "checkbox"
                      value = "dog"
                      id = "Input-Check-Dog"
                    />
                    <label 
                      className = "form-check-label"
                      htmlFor = "Input-Check-Dog"
                    >
                    Dogs
                    </label>
                  </div>
                </div>
              </div>
              <div className = "row">
                <div className = "col-1">
                  <div className = "form-check">
                    <input 
                      className = "form-check-input"
                      type = "checkbox"
                      value = "cat"
                      id = "Input-Check-Cat"
                    />
                    <label 
                      className = "form-check-label"
                      htmlFor = "Input-Check-Cat"
                    >
                    Cats
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className = "col-6 filter-boxes">
              <div className = "row">
                <div className = "col-1">
                  <div className = "form-check">
                    <input 
                      className = "form-check-input"
                      type = "checkbox"
                      value = "food"
                      id = "Input-Check-Food"
                    />
                    <label 
                      className = "form-check-label"
                      htmlFor = "Input-Check-Food"
                    >
                    Food
                    </label>
                  </div>
                </div>
              </div>
              <div className = "row">
                <div className = "col-1">
                  <div className = "form-check">
                    <input 
                      className = "form-check-input"
                      type = "checkbox"
                      value = "toy"
                      id = "Input-Check-Toy"
                    />
                    <label 
                      className = "form-check-label"
                      htmlFor = "Input-Check-Toy"
                    >
                    Toys
                    </label>
                  </div>
                </div>
              </div>
              <div className = "col-2">
                <button 
                  type = "submit" 
                  className = "btn btn-color btn-sm"
                >
                  Filter
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="py-4 container">
        <div className="row">
          {products.map(function (product, index) {
            return (
              <div
                key={index}
                className="products col-9 col-md-6 col-lg-3 col-xs-12"
              >
                <div className="card">
                  <Link to={`/product/${product._id}`} aria-current="page">
                  <img
                    className="card-img-top"
                    src={product.src}
                    alt={`${product.name}`}
                  />
                  </Link>
                  <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                  </div>
                  <p className="card-text">${product.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
