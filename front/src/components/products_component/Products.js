/*

PAGE WORKED ON BY MATTHEW VARGAS 

*/

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./products.css";

let debouncing = null;

function debounce(callback) {
  if (debouncing) {
    clearTimeout(debouncing);
  }

  debouncing = setTimeout(() => {
    debouncing = null;
    callback();
  }, 300);
}

function Products() {
  const [products, setState] = useState([]);
  const [filter, setFilter] = useState([]);

  const [checkedItems, setCheckedItems] = useState({
    dog: false,
    cat: false,
    toy: false,
    food: false,
    grooming: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryUrl = `/api/products/filter${
          filter === "" ? "" : "?filter=" + filter
        }`;
        const response = await fetch(queryUrl);
        const json = await response.json();
        setState(json.data);
      } catch (e) {
        console.log("Error: ", e);
      }
    };

    debounce(fetchData);
  }, [filter]);

  const onChange = (e) => {
    if (checkedItems[e.target.value] === false) {
      setCheckedItems({
        ...checkedItems,
        [e.target.value]: true,
      });
    } else {
      console.log("true");
      setCheckedItems({
        ...checkedItems,
        [e.target.value]: false,
      });
    }
  };

  function handleFilter(event) {
    event.preventDefault();
    let filterOptions = [];
    for (const key in checkedItems) {
      if (checkedItems[key] === true) {
        filterOptions.push(key);
      }
    }

    if (
      filterOptions.length === 0 ||
      filterOptions.length === checkedItems.length
    ) {
      filterOptions = [""];
    }

    setFilter(filterOptions);
  }

  return (
    <div role="main">
      <h1 className="title">Our Products</h1>
      <div className="filter-products row">
        <div className="col-12">
          <form onSubmit={handleFilter}>
            <div className="col-6 filter-boxes filter-boxes-left">
              <div className="row">
                <h2 className="filter-header">Animal</h2>
                <div className="col-1">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="dog"
                      id="Input-Check-Dog"
                      onChange={onChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="Input-Check-Dog"
                    >
                      Dogs
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-1">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="cat"
                      id="Input-Check-Cat"
                      onChange={onChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="Input-Check-Cat"
                    >
                      Cats
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 filter-boxes">
              <h2 className="filter-header">Type</h2>
              <div className="row">
                <div className="col-1">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="food"
                      id="Input-Check-Food"
                      onChange={onChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="Input-Check-Food"
                    >
                      Food
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-1">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="toy"
                      id="Input-Check-Toy"
                      onChange={onChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="Input-Check-Toy"
                    >
                      Toys
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-1">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="grooming"
                      id="Input-Check-Grooming"
                      onChange={onChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="Input-Check-Grooming"
                    >
                      Grooming
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-button col-2">
              <button type="submit" className="btn btn-color btn-sm">
                Filter
              </button>
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
                className="products col-9 col-md-6 col-lg-4 col-xl-3 col-xs-12"
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
                    <h3 className="card-title">{product.name}</h3>
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