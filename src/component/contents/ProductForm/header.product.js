import React from "react";
import '../Css/product.css'; 

const Header = () => {
  return (
    <div className="header">
      <img
        src="https://storage.googleapis.com/a1aa/image/cPL11wrXpj6iHhUlHFYFFafyHOSeMewwJyUTV8bdW7AktNonA.jpg"
        alt="Coffee beans"
        className="store-logo"
      />
      <div className="info">
        <h1>Coffee Store</h1>
        <p>Odessa, ON</p>
        <p className="direction">
          <i className="fas fa-map-marker-alt"></i> Location (Pick Up): 3 McAlpine
          St, Toronto, ON, CA, M5R 3T5{" "}
          <a href="#" className="direction-link">
            Get Direction
          </a>
        </p>
      </div>
      <div className="owner">
        <img
          src="https://storage.googleapis.com/a1aa/image/azSqVlGXpeXf1kiezZZeVwV33ixdm3Yg8NbQCUnZHkGAbbQPB.jpg"
          alt="Owner"
        />
        <p className="owner-name">Owned by Lola and Coco</p>
      </div>
    </div>
  );
};

export default Header;
