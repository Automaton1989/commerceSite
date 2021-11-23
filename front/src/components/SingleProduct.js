import React, {useEffect, useState} from "react";
import {
  useParams
} from "react-router-dom";

function SingleProduct(props) {
	const {id} = useParams();

	console.log(id)
	const [product, setState] = useState([]);
	useEffect(() => {
		const fetchData = async() => {
			try {
				const response = await fetch (`/api/product/data/${id}`);
				const json = await response.json();
				console.log(json);
				setState(json.data)
			} catch (e) {
				console.log("Error", e);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<h1 className="title">{product.name}</h1>
			<div className="row">
				<div className="product-img col-6">
					<img src={product.src} alt="Image here" />
				</div>
				<div className="col-6">
					<h3>{product.price}</h3>
					<p>Product Description?</p>
					<button className="btn btn-primary btn-color">Add To Cart</button>
				</div>
			</div>
		</div>
	);
}

export default SingleProduct;