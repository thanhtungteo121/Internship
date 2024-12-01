import React, { useState } from "react";
import './Css/product.css'; 

const IndexProduct = () => {
  // Dữ liệu sản phẩm
  const [products] = useState([
    {
        id: 1,
        name: "Cappuccino",
        price: "$8",
        image: "https://storage.googleapis.com/a1aa/image/qRtx2ffr7dpilkcM2jUxGCT0eClfYe9BmpuJJz4ZJfxEutB9E.jpg",
        bakery: "Minden Bakery",
        bakeryLogo: "https://storage.googleapis.com/a1aa/image/6HcGfnNMTARrDCDujjUwkV4Wk5LC1ftCaQYXkfMmIsUstNonA.jpg",
      },
      {
        id: 2,
        name: "Matcha Latte",
        price: "$10",
        image: "https://storage.googleapis.com/a1aa/image/61f05UtEekk9eoGkAI6GYEiODBhGeVSZ4Sz3y1EQVLm8bbQPB.jpg",
        bakery: "Minden Bakery",
        bakeryLogo: "https://storage.googleapis.com/a1aa/image/6HcGfnNMTARrDCDujjUwkV4Wk5LC1ftCaQYXkfMmIsUstNonA.jpg",
      },
      {
        id: 3,
        name: "Golden Latte",
        price: "$8",
        image: "https://storage.googleapis.com/a1aa/image/ZgdqC7IrcqbkGJ1gWgh8jPHz8ZCNiMSTA5jzld0TOPDttB9E.jpg",
        bakery: "Minden Bakery",
        bakeryLogo: "https://storage.googleapis.com/a1aa/image/6HcGfnNMTARrDCDujjUwkV4Wk5LC1ftCaQYXkfMmIsUstNonA.jpg",
      },
      {
        id: 4,
        name: "Hot Chocolate",
        price: "$12",
        image: "https://storage.googleapis.com/a1aa/image/fCO8ZdtWUQWVS6dlq3nLdedK4lHRxfpzMgMNnfX4EfyP32geE.jpg",
        bakery: "Minden Bakery",
        bakeryLogo: "https://storage.googleapis.com/a1aa/image/6HcGfnNMTARrDCDujjUwkV4Wk5LC1ftCaQYXkfMmIsUstNonA.jpg",
      },
      {
        id: 5,
        name: "Iced Latte",
        price: "$12",
        image: "https://storage.googleapis.com/a1aa/image/lcpGeac2H7WtFa4QLwFas6af0RhJyhOyVKL4T8bewjH5tNonA.jpg",
        bakery: "Minden Bakery",
        bakeryLogo: "https://storage.googleapis.com/a1aa/image/6HcGfnNMTARrDCDujjUwkV4Wk5LC1ftCaQYXkfMmIsUstNonA.jpg",
      },
      {
        id: 6,
        name: "Plain Croissant",
        price: "$20 / Box (8 pieces)",
        image: "https://storage.googleapis.com/a1aa/image/hrygFdxQToLpPddJ1nn2yz6LgaqnZ4BeubFq375V46JgbD6JA.jpg",
        bakery: "Minden Bakery",
        bakeryLogo: "https://storage.googleapis.com/a1aa/image/6HcGfnNMTARrDCDujjUwkV4Wk5LC1ftCaQYXkfMmIsUstNonA.jpg",
      },
      {
        id: 7,
        name: "French Macaron",
        price: "$30 / Box (12 pieces)",
        image: "https://storage.googleapis.com/a1aa/image/7esdAxweQ6ge1oyGy8dGBdQgXfIsZjRlCLVjHf0dHfesbbD6JA.jpg",
        bakery: "Minden Bakery",
        bakeryLogo: "https://storage.googleapis.com/a1aa/image/6HcGfnNMTARrDCDujjUwkV4Wk5LC1ftCaQYXkfMmIsUstNonA.jpg",
      },
      {
        id: 8,
        name: "Original Blend Coffee",
        price: "$12.99 / Pack",
        image: "https://storage.googleapis.com/a1aa/image/BeAjJ1Dr7R3YT6OUwrzfMTJuliQ9gpTdSazgnXSYvq292G0TA.jpg",
        bakery: "Minden Bakery",
        bakeryLogo: "https://storage.googleapis.com/a1aa/image/6HcGfnNMTARrDCDujjUwkV4Wk5LC1ftCaQYXkfMmIsUstNonA.jpg",
      },
    // Add other products here...
  ]);

  // Hàm ẩn/hiện danh sách bộ lọc
  const toggleFilterVisibility = (event) => {
    const ul = event.target.nextElementSibling;
    if (ul) {
      ul.style.display = ul.style.display === "none" || ul.style.display === "" ? "block" : "none";
    } else {
      console.error("Cannot find the next sibling element for toggling visibility.");
    }
  };
      

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <img
          src="https://storage.googleapis.com/a1aa/image/cPL11wrXpj6iHhUlHFYFFafyHOSeMewwJyUTV8bdW7AktNonA.jpg"
          alt="Coffee beans in a burlap sack"
          className="header-image"
        />
        <div className="info">
          <h1>Coffee Store</h1>
          <p>Odessa, ON</p>
          <p>
            <i className="fas fa-map-marker-alt"></i> Location (Pick Up): 3 McAlpine St, Toronto, ON, CA, M5R 3T5
            <a href="#">Get Direction</a>
          </p>
        </div>
        <div className="owner">
          <img
            src="https://storage.googleapis.com/a1aa/image/azSqVlGXpeXf1kiezZZeVwV33ixdm3Yg8NbQCUnZHkGAbbQPB.jpg"
            alt="Owner with a dog"
            className="owner-image"
          />
          <p>Owned by Lola and Coco</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav">
        <a href="#" className="active">
          Products
        </a>
        <a href="#">Photos</a>
      </nav>

      {/* Content */}
      <main className="content">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="search-container">
            <input type="search" placeholder="Search" />
          </div>
          <a href="#" className="clear-filters">
            Clear all
          </a>
          <div className="filter">
            <h3 onClick={toggleFilterVisibility}>
              Categories <i className="fas fa-chevron-down"></i>
            </h3>
            <ul>
              <li>
                <label>
                  <input type="checkbox" /> Baked Goods (8)
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> Coffee (2)
                </label>
              </li>
            </ul>
          </div>
          <div className="filter">
            <h3 onClick={toggleFilterVisibility}>
              Dietary <i className="fas fa-chevron-down"></i>
            </h3>
            <ul>
              <li>
                <label>
                  <input type="checkbox" /> Eco Friendly (2)
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> Gluten Free (4)
                </label>
              </li>
            </ul>
          </div>
        </aside>

        {/* Product List */}
        <section className="products">
          <div className="controls">
            <span>Show all products ({products.length})</span>
            <span className="center-text">Show image only</span>
            <select>
              <option>Bestselling</option>
            </select>
          </div>
          <div className="grid">
            {products.map((product) => (
              <div key={product.id} className="product">
                <img src={product.image} alt={product.name} />
                <div className="details">
                  <h4>{product.name}</h4>
                  <p className="bakery">
                    <span>{product.bakery}</span>
                  </p>
                  <p className="price">{product.price}</p>
                  <div className="favorite">
                    <i className="far fa-heart"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default IndexProduct;
