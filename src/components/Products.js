import React, { useState } from "react";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Badge,
  IconButton,
  Popover,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import {
  Link,
  ShoppingCart,
  Add,
  Remove,
  Delete as DeleteIcon,
} from "@mui/icons-material";

function Products({ products }) {
  const [copied, setCopied] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveOne = (productId) => {
    setCartItems((prev) =>
      prev
        .map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const handleAddOne = (productId) => {
    setCartItems((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const handleDeleteItem = (productId) => {
    setCartItems((prev) => prev.filter((p) => p.id !== productId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.Price * item.quantity;
    }, 0);
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div
      className="products"
      style={{ marginTop: "20px", position: "relative" }}
    >
      {/* سبد خرید */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 999 }}>
        <IconButton color="primary" onClick={handlePopoverOpen}>
          <Badge badgeContent={getTotalQuantity()} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: { maxWidth: 350, p: 2 },
          }}
        >
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            🛒 سبد خرید
          </Typography>
          <Divider sx={{ mb: 1 }} />

          {cartItems.length === 0 ? (
            <Typography variant="body2">سبد خرید خالی است.</Typography>
          ) : (
            <>
              <List dense>
                {cartItems.map((item) => (
                  <div key={item.id} style={{ width: "100%" }}>
                    <ListItem
                      disableGutters
                      sx={{ flexDirection: "column", alignItems: "flex-start" }}
                    >
                      <Typography variant="subtitle2">
                        {item.ProductName}
                      </Typography>
                      <Typography variant="body2">
                        قیمت: {item.Price.toLocaleString()} تومان
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
                        <Typography variant="body2" sx={{ mr: 1 }}>
                          تعداد:
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveOne(item.id)}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography variant="body2">{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleAddOne(item.id)}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </ListItem>
                    <Divider sx={{ my: 1 }} />
                  </div>
                ))}
              </List>

              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                جمع کل: {getTotalPrice().toLocaleString()} تومان
              </Typography>
            </>
          )}
        </Popover>
      </div>

      {/* لیست محصولات */}
      <Typography variant="h6">Products</Typography>
      {products.length === 0 ? (
        <Typography variant="body1">No products match your filters.</Typography>
      ) : (
        <>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {products.map((prod) => (
              <Grid item xs={12} sm={6} md={4} key={prod.id}>
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

                    {prod.Stock ? (
                      <Button
                        variant="contained"
                        fullWidth
                        color="success"
                        sx={{ mt: 2 }}
                        onClick={() => handleAddToCart(prod)}
                      >
                        Add to Cart
                      </Button>
                    ) : (
                      <Box
                        sx={{
                          marginTop: 2,
                          padding: "8px 12px",
                          borderRadius: "8px",
                          backgroundColor: "#f0f0f0",
                          color: "#999",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        No Stock
                      </Box>
                    )}
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
