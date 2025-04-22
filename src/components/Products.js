import React, { useState } from "react";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Link } from "@mui/icons-material";

function Products({ products }) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="products" style={{ marginTop: "20px" }}>
      <Typography variant="h6">Products</Typography>
      {products.length === 0 ? (
        <Typography variant="body1">No products match your filters.</Typography>
      ) : (
        <>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {products.map((prod, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={prod.Image}
                    alt={prod.ProductName}
                  />
                  <CardContent>
                    <Typography variant="h6">{prod.ProductName}</Typography>
                    <Typography variant="body2">
                      Price: {prod.Price.toLocaleString()} Toman
                    </Typography>
                    <Typography variant="body2">
                      {prod.Stock ? "In Stock" : "Out of Stock"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Link />}
              onClick={handleShare}
            >
              Share Filtered Link
            </Button>
            {copied && (
              <Typography variant="body2" sx={{ color: "green", marginTop: 2 }}>
                Link copied to clipboard!
              </Typography>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
