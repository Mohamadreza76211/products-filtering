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
  Divider,
} from "@mui/material";
import {
  ShoppingCart,
  Add,
  Remove,
  Delete as DeleteIcon,
  Share as ShareIcon,
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
    const uniqueId = `${product.ProductName}-${product.Price}`;
    const newProduct = { ...product, id: uniqueId };

    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === newProduct.id);
      if (existing) {
        return prev.map((p) =>
          p.id === newProduct.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...newProduct, quantity: 1 }];
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
      return total + Number(item.Price) * item.quantity;
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
          PaperProps={{ sx: { maxWidth: 350, p: 2 } }}
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
                {cartItems.map((item, index) => (
                  <Card
                    key={`${item.id}-${index}`}
                    variant="outlined"
                    sx={{ mb: 2, p: 1, display: "flex", alignItems: "center" }}
                  >
                    <CardMedia
                      component="img"
                      image={item.Image}
                      alt={item.ProductName}
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 1,
                        objectFit: "contain",
                        mr: 2,
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2">
                        {item.ProductName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {Number(item.Price).toLocaleString()} تومان
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveOne(item.id)}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleAddOne(item.id)}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Card>
                ))}
              </List>

              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                جمع کل: {getTotalPrice().toLocaleString()} تومان
              </Typography>
            </>
          )}
        </Popover>
      </div>

      <Typography variant="h6">محصولات</Typography>
      {products.length === 0 ? (
        <Typography variant="body1">محصولی یافت نشد.</Typography>
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
                      قیمت: {Number(prod.Price).toLocaleString()} تومان
                    </Typography>

                    {prod.Stock ? (
                      (() => {
                        const id = `${prod.ProductName}-${prod.Price}`;
                        const itemInCart = cartItems.find(
                          (item) => item.id === id
                        );

                        return itemInCart ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              mt: 2,
                            }}
                          >
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleRemoveOne(itemInCart.id)}
                            >
                              <Remove />
                            </IconButton>
                            <Typography sx={{ mx: 1 }}>
                              {itemInCart.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleAddOne(itemInCart.id)}
                            >
                              <Add />
                            </IconButton>
                          </Box>
                        ) : (
                          <Button
                            variant="contained"
                            fullWidth
                            color="success"
                            sx={{ mt: 2 }}
                            onClick={() => handleAddToCart(prod)}
                          >
                            Add{" "}
                          </Button>
                        );
                      })()
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
              startIcon={<ShareIcon />}
              onClick={handleShare}
            >
              اشتراک‌گذاری لینک فیلتر شده
            </Button>
            {copied && (
              <Typography variant="body2" sx={{ color: "green", marginTop: 2 }}>
                لینک با موفقیت کپی شد!
              </Typography>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
