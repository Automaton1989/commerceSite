import React, {useEffect, useState} from "react";
import {
  useParams, useNavigate
} from "react-router-dom";

function SingleProduct() {
	const {id} = useParams();

	const navigate = useNavigate();

	const goBack = () => {
		navigate("/products")
	}

	console.log(id)
	const [product, setState] = useState([]);

	useEffect(() => {
		const fetchData = async() => {
			try {
				const response = await fetch (`/api/product/data/${id}`);
				const json = await response.json();
				console.log("PRODUCT: ", json);
				setState(json.data)
			} catch (e) {
				console.log("Error", e);
			}
		};

		fetchData();
	}, []);

	async function addToCart(event) {
		event.preventDefault();

		const data = {
			id : product._id,
		};

		const options = {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
    
		console.log("POSTING DATA: ", options);
		console.log("DATA POSING: ", data);

		const cartData = await fetch("/api/product/cart", options);
		const cartJson = await cartData.json()
		document.getElementById("result").innerHTML = cartJson.msg;
	}


	return (
		<div>
			<h1 className="title">{product.name}</h1>
			<div className="row">
				<div className = "col-12">
					<h3 id = "result"></h3>
				</div>
				<div className="product-img col-6">
					<img src={product.src} alt="Image here" />
				</div>
				<div className="col-6">
					<h3>{product.price}</h3>
					<p>Product Description?</p>
					<form onSubmit = {addToCart}>
						<button className="btn btn-primary btn-color">Add To Cart</button>
					</form>
					<button type = "button" className = "btn btn-primary btn-color go-back" onClick={goBack}>Go Back</button>
				</div>
			</div>
		</div>
	);
}

export default SingleProduct;