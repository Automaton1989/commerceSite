/* 

PAGE BUILT BY: MATTHEW

*/
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SingleProduct() {
	const { id } = useParams();

	const navigate = useNavigate();

	const goBack = () => {
		navigate("/products");
	};

	const [product, setState] = useState([]);
	const [productReview, setProductReview] = useState({})
	const [addRatingType, setRatingType] = useState(["Choose Rating", "1", "2", "3", "4", "5"])
	const [addContent, setContent] = useState({content: ""});
	const [error, setError] = useState("")

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`/api/product/data/${id}`);
				const json = await response.json();
				console.log("PRODUCT: ", json);
				setState(json.data);
			} catch (e) {
				console.log("Error", e);
			}
		};
		fetchData();
	}, []);

	const Add = addRatingType.map(Add => Add)
	const handleRatingChange = (e) => {
		console.log((addRatingType[e.target.value]))
	}

	async function addToCart(event) {
		event.preventDefault();

		const data = {
			id: product._id,
		};

		const options = {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		};

		const cartData = await fetch("/api/product/cart", options);
		const cartJson = await cartData.json();
		alert("Successful add to the cart" || cartJson.msg);
	}

	async function addComment(event) {
		event.preventDefault();
		let review = document.getElementById("Input-Select");
		if(review.value === "0") {
			setError("Please give this product a rating!")
			return;
		}
		if(!addContent.content) {
			setError("Please write your review content!");
			return;
		}
		console.log("REVIEW REQUIREMENTS MET!");
		console.log(review.value);
		console.log(addContent.content)
	}

	function Review() {
		return (
			<div className = "row">
				<div className = "col-12">
					<h3>Product Reviews</h3>
				</div>
				<div className = "col-12">
					<h3>Add Review</h3>
					<div className = "form-group register-margin headup">
						<div className = "mb-3">{error}</div>
					</div>
					<form onSubmit={addComment}>
						<div className = "form-group">
							<select 
								className = "form-select mb-3"
								id = "Input-Select"
								name = "select"
				            	onChange={e => handleRatingChange(e)}
							>
							{
								Add.map((address, key) => <option value = {key} key = {key}>{address}</option>)
							}
							</select>
						</div>
						<div className = "form-group">
							<label htmlFor="content">Content</label>
							<textarea 
								className = "form-control" 
								name = "content"
								id = "Input-Content"
								rows = "3"
								type="text"
	            				onChange={(e) => setContent({...addContent, content: e.target.value})}
	            				value = {addContent.content}
							/>
						</div>
						<button type = "submit" className = "btn btn-color btn-block mt-2">
							Add Review
						</button>
					</form>
				</div>
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
			<div className="row">
				<div className="product-img col-6">
					<img src={product.src} alt={`${product.name}`} />
				</div>
				<div className="col-6">
					<h3>Price: ${product.price}</h3>
					<p>
						<strong>Description: </strong>
						{product.description}
					</p>
					<div>
						<form onSubmit={addToCart}>
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
			< Review />
		</div>
	);
}


export default SingleProduct;