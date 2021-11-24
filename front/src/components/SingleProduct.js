import React, {useEffect, useState} from "react";
import {
  useParams
} from "react-router-dom";

function SingleProduct(props) {
	const {id} = useParams();

	console.log(id)
	const [product, setState] = useState([]);
	const [user, setUserState] = useState([]);

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

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response  = await fetch("/api/user/data/info");
				const json = await response.json();
				if(json.data == null) {
					console.log("USER WAS NULL");
				} else {
					console.log("USER: ", json.data);
					setUserState(json.data);
				}
			} catch(e) {
				console.log("Error", e);
			}
		};

		fetchUserData();
	}, []);

	async function addToCart(event) {
		event.preventDefault();
		const id = document.getElementById("productId");
		const data = {
			id : id.value
		};

		const options = {
			method: "post",
			credentials: "include",
			headers: {"Content-Type": "application.json"},
			body: JSON.stringify(data),
		}

		console.log("POSTING DATA: ", options);
		console.log("DATA POSING: ", data);
		document.getElementById("result").innerHTML = "SUCCESS";
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
						<input type = "hidden" name = "_id" value = {product._id} id = "productId" />
						<button className="btn btn-primary btn-color">Add To Cart</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SingleProduct;