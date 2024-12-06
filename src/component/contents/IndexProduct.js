import React from "react";
import Header from './ProductForm/header.product';
import Navbar from './ProductForm/navbar.product';
import Sidebar from './ProductForm/slidebar.product';
import ProductGrid from './ProductForm/productgird.product';

import './Css/product.css'; 

const IndexProduct = () => {
  return (
    <div className="app">
      <div className="container">
        <Header />
        <Navbar />
        <div className="content">
          <Sidebar />
          <ProductGrid />
        </div>
      </div>
    </div>
  );
};

export default IndexProduct;
