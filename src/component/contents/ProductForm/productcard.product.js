import React from "react";
import '../Css/product.css'; 

const ProductCard = ({ product, showImagesOnly  }) => {
  return (
    <div className="product">
      <i className="far fa-heart icon-heart"></i>
      <img src={product.image} alt={product.name} />
      {!showImagesOnly && (
      <div className="details">
        <h4>{product.name}</h4>
        <p className="bakery">{product.bakery}</p>
        <p className="price">{product.price}</p>
        <div className="favorite">
          <i className="far fa-heart"></i>
        </div>
      </div>
      )}
    </div>
  );
};

export default ProductCard;
