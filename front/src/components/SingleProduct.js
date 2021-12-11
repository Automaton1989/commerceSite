/* 

PAGE BUILT BY: MATTHEW

*/
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SingleProduct({setCarts}) {

	const { id } = useParams();

	const navigate = useNavigate();

	const goBack = () => {
		navigate("/products");
	};

	const [product, setState] = useState([]);
	const [productReviews, setProductReview] = useState([])
	const [error, setError] = useState("")

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`/api/product/data/${id}`);
				const json = await response.json();
				console.log("PRODUCT: ", json.data);
				console.log("REVIEWS: ", json.reviews)
				setState(json.data);
				setProductReview(json.reviews);
			} catch (e) {
				console.log("Error", e);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
  		window.scrollTo(0, 0)
	}, [])

	async function addToCart(event) {
		event.preventDefault();

		const quantity = document.getElementById("Input-Quantity-Product");
		if(quantity.value > 100) {
			displayMessage({msg: "Enter a valid quantity!"});
			return;
		} else {
			console.log("quantity valid!");
		}

		const data = {
			id: product._id,
			quantity: quantity.value
		};

		const options = {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		};

		const cartData = await fetch("/api/product/cart", options);
		const cartJson = await cartData.json();
		const rawData = await fetch("/api/user/cart");
    const res = await rawData.json();
    setCarts(res.userCart);

		displayMessage({msg: "Congratulations! You've successfully added " + product.name + " to the cart!" || cartJson.msg})
	}

	function displayMessage(newMessage) {
		const message = document.getElementById("cart-message");
		if(message.style.display === "none") {
			message.style.display = "block";
		}
		message.innerHTML = newMessage.msg;
		setTimeout(() => {
			message.style.display = "none";
		}, 3000)
	}

	function Review() {
		return (
				<div className = "py-4 container">
					<div className = "row">
						<div className = "col-12">
							<h3>Product Reviews</h3>
						</div>
					</div>
					{productReviews.map(function (review, index) {
						return (
							<div
								key = {"review: ", index}
								className = "row"
							>
								<div className = "col-12">
									<h3> {review.username} </h3>
									<h5> {review.rating} </h5>
									<p> {review.content} </p>
								</div>
							</div>
						);
					})}
					</div>
		)
	}

	function LineBreak() {
		return (
			<hr className = "my-4"/>
		)
	}

	return (
		<div className="font-setting single-product">
			<h1 className="title">{product.name}</h1>
			<div className = "row">
				<div className = "col-12">
					<span id = "cart-message"></span>
				</div>
			</div>
			<div className="row">
				<div className="product-img col-6">
					<img src={product.src} alt={`${product.name}`} />
				</div>
				<div className="col-6">
					<h2>Price: ${product.price}</h2>
					<p>
						<strong>Description: </strong>
						{product.description}
					</p>
					<div>
						<form onSubmit={addToCart}>
							<div className = "form-group">
								<div className = "mb-3">
								<label htmlFor="Input-Quantity-Product" className = "form-label">
								Add Quantity
								</label>
								<input
									type = "number"
									className = "form-control"
									id = "Input-Quantity-Product"
									name = "quantity"
									min="0"
								/>
								</div>
							</div>
							<button className="btn btn-color btn-block">Add To Cart</button>
						</form>
						<button
							type="button"
							className="btn btn-color btn-block go-back"
							onClick={goBack}
						>
							Go Back
						</button>
					</div>
				</div>
			</div>
			< LineBreak /> 
			{Review()}
		</div>
	);
}


export default SingleProduct;