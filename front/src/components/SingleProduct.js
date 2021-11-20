import React from "react";

function SingleProduct() {

	return (
		<div>
			<h1 className="title">Product Name</h1>
			<div className="row">
				<div className="col-6">
					<img src="..." alt="Image here" />
				</div>
				<div className="col-6">
					<h3>Price Here</h3>
					<p>Product Description?</p>
					<button className="btn btn-primary btn-color">Add To Cart</button>
				</div>
			</div>
		</div>
	);
}

export default SingleProduct;