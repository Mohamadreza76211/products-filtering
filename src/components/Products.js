import React from "react";

function Products({ products }) {
  return (
    <div className="products">
      <h3>Products</h3>
      {products.length === 0 ? (
        <p>No products match your filters.</p>
      ) : (
        <div className="product-list">
          {products.map((prod, idx) => (
            <div key={idx} className="product-card">
              <img src={prod.Image} alt={prod.ProductName} />
              <h4>{prod.ProductName}</h4>
              <p>Price: {prod.Price.toLocaleString()} Toman</p>
              <p>{prod.Stock ? "In Stock" : "Out of Stock"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
