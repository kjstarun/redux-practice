import { useSelector, useDispatch } from "react-redux";
import { setAPIData } from "../redux/APIData";
import { useEffect } from "react";
import "../assets/index.css";
import axios from "axios";
import {
  addItemToCart,
  removeQuantityFromCart,
  removeItemFromcart,
  calculateCartTotalPrice,
  clearCart,
} from "../redux/cartData";
import { Box, Button, Container } from "@mui/material";

const List = () => {
  const dispatch = useDispatch();
  const APIDatas = useSelector((state) => state.APIData.value);
  const CartItems = useSelector((state) => state.CartData.cartItems);
  // const CartItemsQuantity = useSelector((state) => state.CartData.itemCount);
  const TotalPrice = useSelector((state) => state.CartData.cartTotalPrice);

  console.log("cart", CartItems);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((data) => dispatch(setAPIData(data.data)));
  }, []);

  useEffect(() => {
    dispatch(calculateCartTotalPrice());
  }, [CartItems]);

  const product = {
    margin: "10px",
    padding: "5px",
    backgroundColor: "grey",
    color: "white",
  };

  const cart = {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  };

  const button = {
    height: "25px",
    textAlign: "center",
  };

  return (
    // APIDatas && console.log(APIDatas)
    <>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          justifyContent: "center ",
        }}
      >
        {APIDatas ? (
          APIDatas.map((item, index) => {
            return (
              <Box
                sx={{
                  width: 300,
                  height: 300,
                  backgroundColor: "grey",
                  "&:hover": {
                    backgroundColor: "",
                    opacity: [0.9, 0.8, 0.7],
                  },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <p className="item-title">{item.title}</p>
                <img src={item.image} className="item-image" alt="" />
                <Button
                  variant="contained"
                  onClick={() => dispatch(addItemToCart(item))}
                >
                  Add to cart
                </Button>
              </Box>
            );
          })
        ) : (
          <h4>Loading</h4>
        )}
      </Container>

      <h3>Cart:</h3>
      {CartItems &&
        CartItems.map((item, index) => {
          return (
            <div key={index} style={cart}>
              <p>{item.title}</p>
              <button
                style={button}
                onClick={() => dispatch(removeQuantityFromCart(item))}
              >
                -
              </button>
              <p>{CartItems[index].quantity}</p>
              <button
                style={button}
                onClick={() => dispatch(addItemToCart(item))}
              >
                +
              </button>
              <p>Price: {CartItems[index].subTotal.toFixed(2)}</p>
              <button onClick={() => dispatch(removeItemFromcart(item))}>
                Remove
              </button>
            </div>
          );
        })}
      <h4>Total price: {TotalPrice.toFixed(2)}</h4>

      <button onClick={() => dispatch(clearCart())}>Clear cart</button>
    </>
  );
};

export default List;
