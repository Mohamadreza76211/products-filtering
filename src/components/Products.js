import React, { useState } from "react";

function Products({ products }) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // بعد از ۲ ثانیه پیام پاک شود
    });
  };

  return (
    <div className="products">
      <h3>Products</h3>
      {products.length === 0 ? (
        <p>No products match your filters.</p>
      ) : (
        <>
          <div className="product-list">
            {products.map((prod, idx) => (
              <div key={idx} className="product-card">
                <img
                  style={{ height: "120px" }}
                  src={prod.Image}
                  alt={prod.ProductName}
                />
                <h4>{prod.ProductName}</h4>
                <p>Price: {prod.Price.toLocaleString()} Toman</p>
                <p>{prod.Stock ? "In Stock" : "Out of Stock"}</p>
              </div>
            ))}
          </div>

          {/* 🔗 دکمه اشتراک‌گذاری */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              onClick={handleShare}
              style={{ padding: "8px 16px", cursor: "pointer" }}
            >
              Share Filtered Link
            </button>
            {copied && (
              <p style={{ color: "green", marginTop: "8px" }}>
                Link copied to clipboard!
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
