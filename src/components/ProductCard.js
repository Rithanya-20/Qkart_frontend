import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {


//  token,
// items,
// products,
// productId,
// qty,

// console.log("inside product card");
// console.log(product.qty);

// let items = {'productId' : product._id, 'qty' : 1};
let gettoken = localStorage.getItem("token");

let token = '';

if(gettoken){
  token = gettoken;
}

// console.log("token in pc")
// console.log(token);
  
  return (
    <Card className="card">
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
       
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        
        <Typography variant="h5" component="div">
          ${product.cost}
        </Typography>
       
        <Rating name="read-only" value={product.rating} readOnly />
      </CardContent>
      <CardActions className="card-actions">
        <Button size="large" fullWidth key={product._id} variant="contained" className="card-button" onClick={() => (handleAddToCart(token, {'productId' : product._id, 'qty' : 1}, product, product._id, 1, { preventDuplicate: true }))}><AddShoppingCartOutlined />ADD TO CART</Button>
      
      </CardActions>
    </Card>
  );
};

export default ProductCard;
